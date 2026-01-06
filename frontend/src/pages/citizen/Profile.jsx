import CitizenNavbar from "../../components/CitizenNavbar";
import CitizenLeftPanel from "../../components/CitizenLeftPanel";
import Footer from "../../components/Footer";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";

const user = {
  name: "Kalpesh Patil",
  email: "kalpesh@test.com",
  phone: "+91 98765 43210",
  location: "Andheri East, Mumbai",
  joined: "March 2025",
  totalReports: 12,
  resolvedReports: 7,
};

export default function Profile() {
  return (
    <>
      <CitizenNavbar />

      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
        <CitizenLeftPanel />

        <main className="flex-1 p-8 max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 mb-8">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-600 dark:text-gray-300">{user.location}</p>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <Stat label="Total Reports" value={user.totalReports} />
            <Stat label="Resolved" value={user.resolvedReports} />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
            <Detail icon={<Mail />} label="Email" value={user.email} />
            <Detail icon={<Phone />} label="Phone" value={user.phone} />
            <Detail icon={<MapPin />} label="Location" value={user.location} />
            <Detail icon={<Calendar />} label="Joined" value={user.joined} />
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 text-center">
      <h2 className="text-3xl font-bold text-green-500">{value}</h2>
      <p className="text-gray-600 dark:text-gray-300">{label}</p>
    </div>
  );
}

function Detail({ icon, label, value }) {
  return (
    <div className="flex gap-4 py-2">
      <div className="text-green-500">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}
