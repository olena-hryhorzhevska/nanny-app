import AppHeader from "../../components/AppHeader/AppHeader";
import { useState } from "react";
import LoginModal from "../../components/LoginModal/LoginModal.jsx";
import RegistrationModal from "../../components/RegistrationModal/RegistrationModal.jsx";
import { useAuthUser } from "../../hooks/useAuthUser.js";

export default function Nannies() {
  const { user, loading } = useAuthUser();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  if (loading) return null;

  return (
    <div>
      <AppHeader
        user={user}
        onOpenLogin={() => {
          setIsLoginOpen(true);
        }}
        onOpenRegister={() => {
          setIsRegisterOpen(true);
        }}
      />
      <h1>Nannies Page</h1>
      <p>This page provides information about nannies.</p>
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </div>
  );
}
