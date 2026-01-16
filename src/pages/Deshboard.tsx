import { motion } from "framer-motion";
import { Navigate, useNavigate } from "react-router-dom";
import { easeOut } from "framer-motion";
import {
  Users,
  BookOpen,
  BarChart3,
  Settings,
  GraduationCap,
  LineChart,
  Award,
  User,
  CreditCard,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";

/* ================= TYPES ================= */

type DashboardCard = {
  title: string;
  description: string;
  icon: React.ElementType;
  route: string;
};

/* ================= DATA ================= */

const adminCards: DashboardCard[] = [
  {
    title: "Users",
    description: "Manage platform users",
    icon: Users,
    route: "/admin/users",
  },
  {
    title: "Courses",
    description: "Create & manage courses",
    icon: BookOpen,
    route: "/admin/courses",
  },
  {
    title: "Payments", // 🔥 ADDED
    description: "Approve course payments",
    icon: CreditCard,
    route: "/admin/payments",
  },
  {
    title: "Analytics",
    description: "View platform analytics",
    icon: BarChart3,
    route: "/admin/analytics",
  },
  {
    title: "Settings",
    description: "System configuration",
    icon: Settings,
    route: "/admin/settings",
  },
];

const userCards: DashboardCard[] = [
  {
    title: "My Courses",
    description: "Access your enrolled courses",
    icon: GraduationCap,
    route: "/my-courses",
  },
  {
    title: "Progress",
    description: "Track your learning progress",
    icon: LineChart,
    route: "/progress",
  },
  {
    title: "Certificates",
    description: "View earned certificates",
    icon: Award,
    route: "/certificates",
  },
  {
    title: "Profile",
    description: "Manage your profile",
    icon: User,
    route: "/profile",
  },
];

/* ================= ANIMATION ================= */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

/* ================= COMPONENT ================= */

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const isAdmin = user?.role === "admin";
  const cards = isAdmin ? adminCards : userCards;

  const handleOpen = (route: string) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen px-4 py-10 sm:px-6 lg:px-10 bg-gradient-to-br from-black via-slate-900 to-black text-white">
      {/* ===== Welcome ===== */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h1 className="text-3xl md:text-4xl font-bold">
          Welcome back,{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            {user?.name}
          </span>
        </h1>
        <p className="mt-2 text-gray-400">
          {isAdmin
            ? "Manage your platform efficiently"
            : "Continue your learning journey"}
        </p>
      </motion.div>

      {/* ===== Cards ===== */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <motion.div
              key={card.title}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.4, ease: easeOut },
                },
              }}
              className="relative rounded-2xl p-6 backdrop-blur-xl bg-white/5 border border-white/10
                         hover:border-cyan-400/40 transition-all duration-300
                         shadow-[0_0_30px_rgba(0,255,255,0.05)]"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
                  <Icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold">{card.title}</h3>
              </div>

              <p className="text-sm text-gray-400 mb-6">
                {card.description}
              </p>

              <Button
                variant="outline"
                onClick={() => handleOpen(card.route)}
                className="w-full border-cyan-400/30 text-cyan-300 hover:bg-cyan-400/10"
              >
                Open
              </Button>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Dashboard;
