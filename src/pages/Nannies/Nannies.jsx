import AppHeader from "../../components/AppHeader/AppHeader";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import LoginModal from "../../components/LoginModal/LoginModal.jsx";
import RegistrationModal from "../../components/RegistrationModal/RegistrationModal.jsx";

export default function Nannies() {
  const [user, setUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

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
