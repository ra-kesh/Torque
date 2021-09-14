import { useAuth } from "../Hook";
import { useNavigate } from "react-router-dom";

const UserData = () => {
  const { logout, userInfo } = useAuth();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!userInfo) {
  //     navigate("/login");
  //     return;
  //   }
  // }, [userInfo, navigate]);

  return (
    <div>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

export default UserData;
