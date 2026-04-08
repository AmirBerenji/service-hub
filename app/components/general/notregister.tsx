import { useState } from "react";
import {
  User,
  Shield,
  Clock,
  Heart,
  ArrowRight,
  Users,
  Star,
  CheckCircle,
  Lock,
  UserPlus,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotUserRegisterPage() {
  const [activeTab, setActiveTab] = useState("register");
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Main Content */}
          <div className="grid lg:grid-cols-1 gap-12 items-center">
            {/* Left Side - Access Card */}
            <div className="order-1 lg:order-1">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                <div className="p-8 lg:p-10">
                  <div className="text-center mb-8">
                    <div
                      className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: "#ff9a5a20" }}
                    >
                      <Lock className="w-8 h-8" style={{ color: "#ff9a5a" }} />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-700 mb-3">
                      Join <span className="text-[#ff9a5a]">Kidoo</span>
                      <span className="text-[#2f3e4e] tracking-wide">Hub</span>
                    </h2>
                    <p className="text-gray-600 text-lg">
                      To view our qualified nurse directory, please create an
                      account or sign in.
                    </p>
                  </div>

                  {/* Tab Navigation */}
                  <div
                    className="flex rounded-xl p-1 mb-8"
                    style={{ backgroundColor: "#f8f9fa" }}
                  >
                    <button
                      onClick={() => setActiveTab("register")}
                      className={`flex-1 py-3 px-6 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center ${
                        activeTab === "register"
                          ? "bg-white text-gray-700 shadow-md"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Create Account
                    </button>
                    <button
                      onClick={() => setActiveTab("login")}
                      className={`flex-1 py-3 px-6 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center ${
                        activeTab === "login"
                          ? "bg-white text-gray-700 shadow-md"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <User className="w-4 h-4 mr-2" />
                      Sign In
                    </button>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => {
                      const targetPath =
                        activeTab === "register"
                          ? "/en/user/signup"
                          : "/en/user/login";
                      router.push(targetPath);
                    }}
                    className="w-full py-4 px-8 rounded-xl font-semibold text-lg text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center group"
                    style={{
                      background: `linear-gradient(135deg, #ff9a5a 0%, #ff8040 100%)`,
                    }}
                  >
                    {activeTab === "register"
                      ? "Create Account"
                      : "Sign In to Continue"}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="text-center mt-6">
                    <p className="text-sm text-gray-500">
                      {activeTab === "register"
                        ? "Already have an account?"
                        : "Don't have an account?"}{" "}
                      <button
                        onClick={() =>
                          setActiveTab(
                            activeTab === "register" ? "login" : "register",
                          )
                        }
                        className="font-semibold hover:underline"
                        style={{ color: "#ff9a5a" }}
                      >
                        {activeTab === "register"
                          ? "Sign in here"
                          : "Register now"}
                      </button>
                    </p>
                  </div>

                  {/* Features */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="text-center mb-4">
                      <p className="text-sm font-medium text-gray-900">
                        Registration includes:
                      </p>
                    </div>
                    <div className="space-y-3">
                      {/* <div className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 mr-3 text-green-500 flex-shrink-0" />
                        <span className="text-gray-600">Access to 500+ verified nurses</span>
                      </div> */}
                      <div className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 mr-3 text-green-500 flex-shrink-0" />
                        <span className="text-gray-600">
                          Direct booking & messaging
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 mr-3 text-green-500 flex-shrink-0" />
                        <span className="text-gray-600">
                          24/7 customer support
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Benefits */}
            <div className="order-1 lg:order-2">
              <div className="space-y-8">
                <div>
                  <h3 className="text-3xl font-bold text-gray-700 mb-6">
                    Why Choose KidooHub Nurses?
                  </h3>
                  <p className="text-lg text-gray-600 mb-8">
                    We don't just connect you with nurses – we ensure every
                    healthcare professional meets our rigorous standards for
                    safety, experience, and reliability.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4 p-6 rounded-2xl bg-white shadow-sm border border-gray-100">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "#ff9a5a20" }}
                    >
                      <Shield
                        className="w-6 h-6"
                        style={{ color: "#ff9a5a" }}
                      />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-700 mb-2">
                        Thoroughly Verified
                      </h4>
                      <p className="text-gray-600">
                        Background checks, license verification, and reference
                        validation for every nurse.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-6 rounded-2xl bg-white shadow-sm border border-gray-100">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "#ff9a5a20" }}
                    >
                      <Star className="w-6 h-6" style={{ color: "#ff9a5a" }} />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-700 mb-2">
                        Highly Rated
                      </h4>
                      <p className="text-gray-600">
                        Only professionals with excellent reviews and proven
                        track records.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-6 rounded-2xl bg-white shadow-sm border border-gray-100">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "#ff9a5a20" }}
                    >
                      <Clock className="w-6 h-6" style={{ color: "#ff9a5a" }} />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-700 mb-2">
                        Available When You Need
                      </h4>
                      <p className="text-gray-600">
                        Flexible scheduling including evenings, weekends, and
                        emergency coverage.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                {/* <div className="grid grid-cols-3 gap-6 pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#ff9a5a]" >500+</div>
                    <div className="text-sm text-gray-600">Qualified Nurses</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#ff9a5a]">4.9★</div>
                    <div className="text-sm text-gray-600">Average Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#ff9a5a]">24/7</div>
                    <div className="text-sm text-gray-600">Support</div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          {/* Trust Section */}
          <div className="mt-20 text-center">
            <p className="text-gray-500 mb-6">
              Trusted by thousands of families
            </p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="bg-gray-100 px-6 py-3 rounded-full text-sm font-medium">
                🔒 Secure & Private
              </div>
              <div className="bg-gray-100 px-6 py-3 rounded-full text-sm font-medium">
                ✓ Verified Professionals
              </div>
              <div className="bg-gray-100 px-6 py-3 rounded-full text-sm font-medium">
                ⭐ Premium Support
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
