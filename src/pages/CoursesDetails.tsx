import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Button } from "../components/ui/button";
import { CourseVideoPlayer } from "./courses/CourseVideoPlayer";

import {
  Clock,
  BookOpen,
  User,
  Star,
  Play,
  CreditCard,
  AlertTriangle,
} from "lucide-react";

/* ===== COURSE TYPE ===== */
interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  level: string;
  duration: string;
  students: string;
  rating: number;
  color: string;
  syllabus: string[];
  price?: number;
}

const TXN_REGEX = /^[A-Za-z0-9]{10,25}$/;

const CourseDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const course: Course | null = location.state?.course || null;

  const [showDemo, setShowDemo] = useState(false);
  const [showUPI, setShowUPI] = useState(false);

  const [txnId, setTxnId] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState("");

  const amount = course?.price ?? 499;

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Course not found
      </div>
    );
  }

  const handlePaymentSubmit = () => {
    setError("");

    if (!TXN_REGEX.test(txnId)) {
      setError("Invalid Transaction ID format");
      return;
    }

    if (!confirmed) {
      setError("Please confirm payment");
      return;
    }

    const paymentRecord = {
      paymentId: txnId,
      courseId: course.id,
      courseTitle: course.title,
      amount,
      status: "PENDING",
      createdAt: Date.now(),
    };

    const existing = JSON.parse(localStorage.getItem("payments") || "[]");

    localStorage.setItem(
      "payments",
      JSON.stringify([...existing, paymentRecord])
    );

    setShowUPI(false);
    navigate("/deshboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        {/* ===== HERO ===== */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-panel-strong p-8 rounded-3xl"
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div
                  className={`w-28 h-28 rounded-3xl bg-gradient-to-br ${course.color}
                  flex items-center justify-center text-5xl`}
                >
                  {course.image}
                </div>

                <div className="flex-1">
                  <h1 className="text-4xl font-bold gradient-text mb-3">
                    {course.title}
                  </h1>

                  <p className="text-muted-foreground mb-6">
                    {course.description}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4" /> {course.level}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4" /> {course.duration}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <BookOpen className="w-4 h-4" /> {course.students}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      {course.rating}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button
                      size="lg"
                      variant="premium"
                      onClick={() => setShowUPI(true)}
                    >
                      <CreditCard className="w-5 h-5 mr-2" />
                      Enroll Now – ₹{amount}
                    </Button>

                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => setShowDemo(true)}
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Watch Demo
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      {/* ===== DEMO VIDEO PLAYER ===== */}
      <AnimatePresence>
        {showDemo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          >
            <CourseVideoPlayer
              title={`${course.title} – Demo`}
              videoUrl={null}
              onClose={() => setShowDemo(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== UPI PAYMENT MODAL ===== */}
      <AnimatePresence>
        {showUPI && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative bg-white rounded-3xl p-6 w-full max-w-sm text-center"
            >
              <h2 className="text-2xl font-bold mb-2">Pay via UPI</h2>

              <p className="text-sm text-gray-600 mb-3">
                Amount: <b>₹{amount}</b>
              </p>

              <img
                src="/barcode.jpeg"
                alt="UPI QR"
                className="w-48 mx-auto mb-4"
              />

              <input
                type="text"
                placeholder="UPI Transaction ID"
                value={txnId}
                onChange={(e) => setTxnId(e.target.value.trim())}
                className="w-full mb-2 px-4 py-2 border rounded-lg text-sm"
              />

              <label className="flex items-center gap-2 text-sm mb-3">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                />
                I confirm payment of ₹{amount}
              </label>

              {error && (
                <div className="flex items-center gap-2 text-red-500 text-sm mb-3">
                  <AlertTriangle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <Button
                className="w-full"
                disabled={!txnId || !confirmed}
                onClick={handlePaymentSubmit}
              >
                I have paid
              </Button>

              <button
                onClick={() => setShowUPI(false)}
                className="mt-3 text-sm text-gray-500"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CourseDetail;
