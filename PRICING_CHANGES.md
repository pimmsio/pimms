# Pricing Changes Recap - October 2025

## Old Pricing Structure (BEFORE)

### Lifetime Plans

- **Starter**: €59 (one-time)
  - 200 smart links/month
  - Unlimited leads tracking
  - 3 custom domains
  - 3 team members
  - 6 months data retention
  - 1 month priority support

- **Pro**: €99 (one-time)
  - 600 smart links/month
  - Limited sales tracking
  - 5 team members
  - 12 months data retention
  - 3 months priority support

### On-Demand

- **Business**: Custom pricing
  - Unlimited everything

---

## New Pricing Structure (AFTER)

### Traffic-Based Subscription Plans (Monthly/Yearly)

| Tier | Events | Monthly | Yearly (2 months free) | Links/month | Custom Domains | Data Retention |
| ---- | ------ | ------- | ---------------------- | ----------- | -------------- | -------------- |
| 1    | 5k     | €9      | €90                    | 100         | 3              | 6 months       |
| 2    | 20k    | €19     | €190                   | 200         | 6              | 12 months      |
| 3    | 40k    | €29     | €290                   | 400         | Unlimited      | 12 months      |
| 4    | 100k   | €49     | €490                   | 1000        | Unlimited      | 12 months      |
| 5    | 200k   | €69     | €690                   | 2000        | Unlimited      | 12 months      |

**All subscription tiers include:**

- Events tracking (clicks, leads, sales)
- 100+ integrations incl. Zapier
- Support Stripe payments
- A/B testing
- Webhooks
- Unlimited UTM
- Unlimited team members
- 3 months priority support included

### Lifetime Plans (One-time payment)

| Tier | Events | Price | Links/month | Custom Domains | Data Retention |
| ---- | ------ | ----- | ----------- | -------------- | -------------- |
| 1    | 5k     | €99   | 100         | 3              | 6 months       |
| 2    | 20k    | €199  | 200         | 6              | 12 months      |
| 3    | 40k    | €299  | 400         | Unlimited      | 12 months      |
| 4    | 100k   | €499  | 1000        | Unlimited      | 12 months      |
| 5    | 200k   | €699  | 2000        | Unlimited      | 12 months      |

**Lifetime features:**

- Same as corresponding subscription tier
- No recurring fees
- One-time payment

---

## Key Changes Summary

### 1. **Pricing Model Change**

- **OLD**: 2 lifetime tiers (€59, €99) + On-demand
- **NEW**: 5 subscription tiers (€9-€69/month) + 5 lifetime tiers (€99-€699)

### 2. **Event-Based Pricing**

- Plans are now based on **monthly events** (clicks, leads, sales)
- 1 event = 1 click = 1 lead = 1 sale
- Example: 10$ collected in sales = 1 event

### 3. **Feature Changes**

- **Links per month**: Now 100-2000 (instead of 200-600)
- **Custom domains**: Unlimited from €29/month tier (instead of fixed 3-5)
- **Team members**: All plans have unlimited (instead of 3-5)
- **Data retention**: 6-12 months (same)

### 4. **Lifetime Pricing**

- **OLD**: €59-€99 fixed
- **NEW**: €99-€699 (scales with traffic)
- Lifetime = ~11x monthly price (€9/month → €99 lifetime)

### 5. **Business/On-Demand**

- No longer shown in public pricing
- Contact sales for custom needs

---

## Implementation Checklist

### Database/Backend Changes Needed:

1. **Add new plan tiers** (subscription_plans table):

   ```sql
   -- Subscription plans
   tier_5k_monthly: €9/month, 100 links, 5k events, 3 domains
   tier_20k_monthly: €19/month, 200 links, 20k events, 6 domains
   tier_40k_monthly: €29/month, 400 links, 40k events, unlimited domains
   tier_100k_monthly: €49/month, 1000 links, 100k events, unlimited domains
   tier_200k_monthly: €69/month, 2000 links, 200k events, unlimited domains

   tier_5k_yearly: €90/year, 100 links, 5k events, 3 domains
   tier_20k_yearly: €190/year, 200 links, 20k events, 6 domains
   tier_40k_yearly: €290/year, 400 links, 40k events, unlimited domains
   tier_100k_yearly: €490/year, 1000 links, 100k events, unlimited domains
   tier_200k_yearly: €690/year, 2000 links, 200k events, unlimited domains
   ```

2. **Add new lifetime plans**:

   ```sql
   -- Lifetime plans
   tier_5k_lifetime: €99, 100 links, 5k events, 3 domains
   tier_20k_lifetime: €199, 200 links, 20k events, 6 domains
   tier_40k_lifetime: €299, 400 links, 40k events, unlimited domains
   tier_100k_lifetime: €499, 1000 links, 100k events, unlimited domains
   tier_200k_lifetime: €699, 2000 links, 200k events, unlimited domains
   ```

3. **Deprecate old plans** (keep for existing customers):
   - starter_lifetime_59
   - pro_lifetime_99
   - Mark as `is_legacy: true`

4. **Add event tracking counter**:
   - Track total events per month (clicks + leads + sales)
   - Alert when approaching limit
   - Suggest upgrade when limit reached

5. **Payment links to update**:
   - `/api/pay?id=5kAeWJ8Q2f0O1e8dQS` (old €59) → Remove or redirect
   - `/api/pay?id=9B66oG2VvcYq3STaGmc7u07` (old €99) → Remove or redirect
   - Create new payment IDs for each tier

6. **Stripe product IDs**:
   - Create 10 new products (5 monthly + 5 yearly)
   - Create 5 new products (lifetime tiers)
   - Update checkout flow

---

## Migration Strategy for Existing Users

### Users on OLD €59 Starter Lifetime

- **Map to**: New €99 Lifetime (5k events tier)
- **Grandfathered**: Keep 200 links (instead of 100)
- **Action**: Email notification of upgrade

### Users on OLD €99 Pro Lifetime

- **Map to**: New €199 Lifetime (20k events tier)
- **Grandfathered**: Keep 600 links (instead of 200)
- **Action**: Email notification of upgrade

### Free Plan Users

- **No change**: Still 10 smart links
- **Upgrade path**: Show new tier selector UI

---

## UI/UX Changes

### Frontend Components Created:

- `PricingSlider` - Tier selector (5k/20k/40k/100k/200k)
- `BillingToggle` - Monthly/Yearly toggle
- `DynamicPrice` - Shows price based on selected tier
- `DynamicValue` - Shows values based on tier
- `DynamicDomains` - Shows 3/6/Unlimited based on tier

### Translations:

- EN: `messages/general/en.json` → `general.pricing.*`
- FR: `messages/general/fr.json` → `general.pricing.*`

---

## Testing Checklist

- [ ] New Stripe products created for all tiers
- [ ] Payment flow works for monthly plans
- [ ] Payment flow works for yearly plans
- [ ] Payment flow works for lifetime plans
- [ ] Event counter tracks clicks correctly
- [ ] Event counter tracks leads correctly
- [ ] Event counter tracks sales correctly
- [ ] Upgrade prompts when approaching limits
- [ ] Legacy users migrated correctly
- [ ] Emails sent to existing customers
- [ ] FAQ updated with new pricing
- [ ] Blog articles updated (45+ files)
- [ ] Landing pages updated (10 files)

---

## Pricing Calculator Logic

```javascript
// Monthly event limits
const EVENT_LIMITS = {
  tier_5k: 5000,
  tier_20k: 20000,
  tier_40k: 40000,
  tier_100k: 100000,
  tier_200k: 200000
};

// Link limits
const LINK_LIMITS = {
  tier_5k: 100,
  tier_20k: 200,
  tier_40k: 400,
  tier_100k: 1000,
  tier_200k: 2000
};

// Custom domains
const DOMAIN_LIMITS = {
  tier_5k: 3,
  tier_20k: 6,
  tier_40k: Infinity,
  tier_100k: Infinity,
  tier_200k: Infinity
};

// Pricing
const MONTHLY_PRICES = [9, 19, 29, 49, 69];
const YEARLY_PRICES = [90, 190, 290, 490, 690]; // 2 months free
const LIFETIME_PRICES = [99, 199, 299, 499, 699]; // ~11x monthly

// Event counting
function countMonthlyEvents(userId, month) {
  const clicks = getClickCount(userId, month);
  const leads = getLeadCount(userId, month);
  const sales = getSaleCount(userId, month);
  return clicks + leads + sales;
}

// Upgrade suggestion
function suggestUpgrade(currentTier, eventCount) {
  const limit = EVENT_LIMITS[currentTier];
  if (eventCount >= limit * 0.8) {
    return "You're approaching your event limit. Consider upgrading!";
  }
  return null;
}
```

---

## Important Notes

1. **Event Definition**: 1 event = 1 click OR 1 lead OR 1 sale (not cumulative)
2. **Domain Unlocking**: Unlimited domains start at €29/month tier (40k events)
3. **Data Retention**: 5k tier = 6 months, all others = 12 months
4. **Priority Support**: All tiers include 3 months priority support
5. **Free Trial**: 14-day free trial on all subscription plans (no credit card)
6. **Yearly Discount**: Always 2 months free (pay for 10, get 12)

---

## Next Steps

1. Create Stripe products for all new tiers
2. Update payment API endpoints
3. Implement event counter in analytics
4. Update dashboard to show tier limits
5. Create upgrade flow UI
6. Send migration emails to existing customers
7. Update documentation/help center
8. Monitor conversions after launch
