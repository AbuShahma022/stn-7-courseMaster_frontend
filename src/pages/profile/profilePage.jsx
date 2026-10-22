
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMeAsync } from "../../store/slices/authSlice";

export default function ProfilePage() {
  const dispatch = useDispatch();

  const { user, loading, error } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!user) {
      dispatch(getMeAsync());
    }
  }, [dispatch, user]);

  if (loading && !user) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const initials = user.name
    ? user.name
        .split(" ")
        .map((word) => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="container mx-auto px-4 py-10 min-h-[60vh]">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">My Profile</h1>
        <p className="text-base-content/70 mb-8">
          View your account information.
        </p>

        <div className="card bg-base-100 shadow-md border border-base-300">
          <div className="card-body">
            <div className="flex items-center gap-4 mb-6">
              <div className="avatar placeholder">
                <div className="flex items-center justify-center w-16 h-16 shrink-0 rounded-full bg-primary text-primary-content">
                  <span className="text-xl font-bold">{initials}</span>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-base-content/70">{user.email}</p>
              </div>
            </div>

            <div className="divider" />

            <div className="space-y-5">
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Full Name</span>
                </label>
                <p className="input input-bordered flex items-center">
                  {user.name || "Not available"}
                </p>
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold">
                    Email Address
                  </span>
                </label>
                <p className="input input-bordered flex items-center">
                  {user.email || "Not available"}
                </p>
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold">Role</span>
                </label>
                <div>
                  <span className="badge badge-outline badge-lg capitalize">
                    {user.role || "Student"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
