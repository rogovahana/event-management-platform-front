import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbari from '../../components/Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProfilePage.css';
import Footeri from '../../components/Footer/Footer';
import { fetchUserProfile, updateUserProfile, UserProfile } from '../../services/userProfileService';

const ProfilePage: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserProfile();
        setUserProfile(data);
        setFormData({
          username: data.username,
          email: data.email,
          phoneNumber: data.phoneNumber,
        });
      } catch (error) {
        setError('Failed to fetch user profile');
        console.error('Failed to fetch user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const updatedProfile = await updateUserProfile(formData);
      setUserProfile(updatedProfile);
      setIsEditing(false);
    } catch (error) {
      setError('Failed to save user profile');
      console.error('Failed to save user profile:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Navbari />
      <div className="container-fluid">
        <div className="row">
          <nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link className="nav-link" to="/profile-page">
                    Account Information
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/my-tickets">
                    Tickets
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
            <h1 className="h2">Account Information</h1>
            {userProfile ? (
              <div className="account-info w-75">
                <form className="d-flex flex-column gap-2">
                  <div className="form-group">
                    <label>Username</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.username}
                      disabled={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={formData.email}
                      disabled={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      value={formData.phoneNumber}
                      disabled={!isEditing}
                      onChange={(e) =>
                        setFormData({ ...formData, phoneNumber: e.target.value })
                      }
                    />
                  </div>
                  {isEditing ? (
                    <button
                      type="button"
                      className="btn btn-primary save-btn"
                      onClick={handleSaveClick}
                    >
                      Save Changes
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-primary edit-btn"
                      onClick={handleEditClick}
                    >
                      Edit
                    </button>
                  )}
                </form>
              </div>
            ) : (
              <p>No user profile found.</p>
            )}
            <h2>My Events</h2>
            <div className="row">
              {userProfile &&
                userProfile.events.map((event) => (
                  <div key={event.Id} className="col-md-4">
                    <div className="card mb-4 shadow-sm">
                      <div className="card-body">
                        <p><strong>Event:</strong> {event.Title}</p>
                        <p><strong>Start Date:</strong> {new Date(event.StartDate).toLocaleDateString()}</p>
                        <p><strong>Attendees:</strong> {event.Attendees}</p>
                        <p><strong>Available Tickets:</strong> {event.AvailableTickets}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </main>
        </div>
      </div>
      <Footeri />
    </>
  );
};

export default ProfilePage;
