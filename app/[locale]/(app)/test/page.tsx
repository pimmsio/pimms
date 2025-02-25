export default function TestPage() {
  return (
    <div className="flex flex-col gap-4">
      <a
        className="text-center text-blue-500 block p-3 bg-gray-100 rounded-md"
        href="snssdk1233://tiktok.com/@_bryan_johnson_"
      >
        Test 1 (works on ios)
      </a>

      <a
        className="text-center text-blue-500 block p-3 bg-gray-100 rounded-md"
        href="intent://www.tiktok.com/@_bryan_johnson_#Intent;scheme=https;package=com.zhiliaoapp.musically;action=android.intent.action.VIEW;S.browser_fallback_url=https%3A%2F%2Fwww.tiktok.com%2F@_bryan_johnson_;end"
      >
        Test 2 (works for android)
      </a>

      <a
        className="text-center text-blue-500 block p-3 bg-gray-100 rounded-md"
        href="intent://www.tiktok.com/@_bryan_johnson_#Intent;scheme=https;package=com.zhiliaoapp.musically;end"
      >
        Test 4 (works for android)
      </a>
    </div>
  );
}
