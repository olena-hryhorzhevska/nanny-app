import AppHeader from "../../components/AppHeader/AppHeader";
import { useState, useEffect } from "react";
import LoginModal from "../../components/LoginModal/LoginModal.jsx";
import RegistrationModal from "../../components/RegistrationModal/RegistrationModal.jsx";
import { useAuthUser } from "../../hooks/useAuthUser.js";
import { ref, get } from "firebase/database";
import { db } from "../../firebase/firebase";
import NannyCard from "../../components/NannyCard/NannyCard.jsx";

export default function Nannies() {
  const { user, loading } = useAuthUser();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const [nannies, setNannies] = useState([]);
  const [nanniesLoading, setNanniesLoading] = useState(true);

  useEffect(() => {
    const fetchNannies = async () => {
      try {
        const snap = await get(ref(db, "nannies"));

        if (!snap.exists()) {
          setNannies([]);
          return;
        }

        const data = snap.val();
        const list = Object.entries(data).map(([id, nanny]) => ({
          id,
          ...nanny,
        }));

        setNannies(list);
      } catch (e) {
        console.log(e);
      } finally {
        setNanniesLoading(false);
      }
    };

    fetchNannies();
  }, []);

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
      {nanniesLoading ? (
        <p>Loading nannies…</p>
      ) : (
        nannies.map((nanny) => <NannyCard key={nanny.id} nanny={nanny} />)
      )}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </div>
  );
}
