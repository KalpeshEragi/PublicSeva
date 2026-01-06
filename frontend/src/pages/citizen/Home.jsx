import CitizenNavbar from "../../components/CitizenNavbar";
import CitizenLeftPanel from "../../components/CitizenLeftPanel";
import Footer from "../../components/Footer";
import ReportButton from "../../components/ReportButton";
import { ThumbsUp, MessageCircle, MapPin, Flame } from "lucide-react";

const reports = [
  {
    id: 1,
    title: "Garbage pile near bus stop",
    description:
      "Garbage has been piling up near the main bus stop for several days.",
    image: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807",
    location: "Andheri East, Mumbai",
    votes: 32,
    comments: 8,
    severity: "High",
    time: "2 days ago",
  },
];

const severityStyles = {
  Low: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  Medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  High: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
  Critical: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
};

export default function Home() {
  return (
    <>
      <CitizenNavbar />

      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
        <CitizenLeftPanel />

        <main className="flex-1 px-6 py-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Community Issues
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Problems reported by citizens near you
          </p>

          {reports.map((r) => (
            <div
              key={r.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow border dark:border-gray-700 overflow-hidden mb-8"
            >
              <img src={r.image} className="w-full h-64 object-cover" />

              <div className="p-6">
                <span className={`px-3 py-1 text-xs rounded-full ${severityStyles[r.severity]}`}>
                  <Flame size={14} className="inline" /> {r.severity}
                </span>

                <h2 className="text-xl font-semibold mt-4">{r.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {r.description}
                </p>

                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-3">
                  <MapPin size={16} /> {r.location}
                </div>

                <div className="flex justify-between mt-4 border-t dark:border-gray-700 pt-4">
                  <div className="flex gap-6">
                    <button className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-green-500">
                      <ThumbsUp size={18} /> {r.votes}
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-500">
                      <MessageCircle size={18} /> {r.comments}
                    </button>
                  </div>
                  <span className="text-xs text-gray-400">{r.time}</span>
                </div>
              </div>
            </div>
          ))}
        </main>
      </div>

      <ReportButton />
      <Footer />
    </>
  );
}
