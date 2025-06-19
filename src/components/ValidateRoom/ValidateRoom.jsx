import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { supabase } from "../../components/Supabase/SupabaseClient";

export default function ValidateRoom () {
  const { id: roomId } = useParams();
  const [roomValid, setRoomValid] = useState(null); // null = loading, true/false = result

  useEffect(() => {
    const checkRoomExists = async () => {
      const { data, error } = await supabase
        .from("session_room")
        .select("id")
        .eq("room_id", roomId)
        .single();
      setRoomValid(!!data && !error);
    };

    checkRoomExists();
  }, [roomId]);
  
  if (roomValid === null) return <div>Loading...</div>; // or a spinner
//   if (roomValid === false) return <Navigate to="/404" replace />;

  return (
    <div>
      {/* Your editor UI goes here */}
      <h1
        style={{
            color:'White'
        }}
      >Welcome to room: {roomId}</h1>
    </div>
  );
};
