import { SignIn } from "@clerk/nextjs";
// Optional if you want a dark theme

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f172a] p-4">
      <div className="rounded-2xl shadow-2xl bg-white dark:bg-gray-900 p-8 w-full max-w-md animate-fade-in">
        <SignIn
          appearance={{
            elements: {
              card: "shadow-none bg-transparent",
              headerTitle: "text-2xl font-bold text-[#0f172a] dark:text-white",
              headerSubtitle: "text-sm text-gray-500",
              formFieldLabel: "text-sm text-gray-600 dark:text-gray-300",
              formButtonPrimary:
                "bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold py-2 px-4 rounded-xl transition-all",
              footerActionText: "text-sm text-gray-600 dark:text-gray-300",
              socialButtonsBlockButton:
                "bg-[#2563eb] text-white hover:bg-[#1d4ed8] rounded-xl py-2 transition-all",
            },
            variables: {
              colorPrimary: "#2563eb", // solid professional blue
              colorText: "#0f172a",
              borderRadius: "8px",
            },
          }}
        />
      </div>
    </div>
  );
}
