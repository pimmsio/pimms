import { NextRequest } from "next/server";
import { pimms } from "@/lib/pimms";

export const POST = async (req: NextRequest) => {
  const rawBody = await req.text();

  // Basic security: Check User-Agent and validate JSON structure
  const userAgent = req.headers.get("user-agent") || "";
  if (!userAgent.includes("Cal.com") && !userAgent.includes("cal.com")) {
    console.warn("Suspicious webhook request - invalid user agent", { userAgent });
    // Don't return error to avoid revealing security measures
  }

  try {
    const body = JSON.parse(rawBody);
    const { triggerEvent, payload } = body;

    // Validate required fields and structure
    if (!triggerEvent || !payload) {
      console.warn("Invalid webhook payload structure", { triggerEvent, hasPayload: !!payload });
      return new Response("Missing required fields", { status: 400 });
    }

    // Log webhook for monitoring
    console.log("Cal.com webhook received", {
      triggerEvent,
      userAgent: userAgent.substring(0, 100),
      timestamp: new Date().toISOString()
    });

    // Handle different Cal.com events
    if (triggerEvent === "BOOKING_CREATED") {
      const { booking, attendees } = payload;

      if (!booking || !attendees || attendees.length === 0) {
        return new Response("Missing booking or attendee data", { status: 400 });
      }

      const attendee = attendees[0]; // Get primary attendee
      const email = attendee.email;
      const name = attendee.name;

      // Extract pimms_id from booking responses/metadata
      let pimmsId = null;

      // Check if pimms_id is in booking responses
      if (booking.responses && booking.responses.pimms_id) {
        pimmsId = booking.responses.pimms_id;
      }

      // Check if pimms_id is in booking metadata
      if (!pimmsId && booking.metadata && booking.metadata.pimms_id) {
        pimmsId = booking.metadata.pimms_id;
      }

      if (!pimmsId) {
        console.log("No pimms_id found in booking", { bookingId: booking.id });
        return new Response("No pimms_id found", { status: 200 });
      }

      // Track the lead conversion in PIMMS
      await pimms.track.lead({
        clickId: pimmsId,
        eventName: "Cal.com Booking",
        customerEmail: email,
        customerName: name,
        externalId: booking.id?.toString() || booking.uid,
        metadata: {
          bookingId: booking.id,
          bookingUid: booking.uid,
          eventType: booking.eventType?.title || "Meeting",
          startTime: booking.startTime,
          endTime: booking.endTime,
          status: booking.status,
          meetingUrl: booking.location
        }
      });

      console.log("Cal.com booking tracked", {
        bookingId: booking.id,
        email,
        pimmsId,
        eventType: booking.eventType?.title
      });

      return new Response("OK", { status: 201 });
    } else if (triggerEvent === "BOOKING_CANCELLED") {
      // Handle booking cancellation if needed
      console.log("Booking cancelled", { payload });
      return new Response("OK", { status: 200 });
    } else if (triggerEvent === "BOOKING_RESCHEDULED") {
      // Handle booking rescheduling if needed
      console.log("Booking rescheduled", { payload });
      return new Response("OK", { status: 200 });
    } else {
      console.log("Unsupported Cal.com event", { triggerEvent });
      return new Response("Unsupported event", { status: 200 });
    }
  } catch (err: any) {
    console.error("Cal.com webhook parsing failed", { error: err.message, rawBody });
    return new Response("Invalid payload", { status: 400 });
  }
};
