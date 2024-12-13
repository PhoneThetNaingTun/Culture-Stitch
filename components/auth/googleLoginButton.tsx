import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const GoogleLoginButton = () => {
  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={async () => {
        await signIn("google", { callbackUrl: DEFAULT_LOGIN_REDIRECT });
      }}
    >
      <FcGoogle /> Google
    </Button>
  );
};
