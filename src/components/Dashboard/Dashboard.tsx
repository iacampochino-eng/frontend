"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MainLayout from "../Layout/MainLayout";
import { BannerContacto } from "../Banners/BannerContacto";
import { GridCards } from "./GridCards";
import { CardsUltimosCincoVideos } from "./CardsUltimosCincoVideos";



export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-900">
      <MainLayout>
        <div className="flex-1 space-y-6 p-6 bg-[#1A1C24]">
          {/* Promotional Banner */}
          <BannerContacto />

          {/* Darshboard Cards */}
          <GridCards />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Transaction History */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">
                    Transaction History
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="relative inline-flex items-center justify-center w-32 h-32">
                      <svg className="w-32 h-32 transform -rotate-90">
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          className="text-gray-600"
                        />
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 56}`}
                          strokeDashoffset={`${2 * Math.PI * 56 * (1 - 0.75)}`}
                          className="text-yellow-500"
                          strokeLinecap="round"
                        />
                        <circle
                          cx="64"
                          cy="64"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 40}`}
                          strokeDashoffset={`${2 * Math.PI * 40 * (1 - 0.5)}`}
                          className="text-green-500"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white">
                            $1200
                          </div>
                          <div className="text-xs text-gray-400">Total</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-white font-medium">
                          Transfer to Paypal
                        </p>
                        <p className="text-xs text-gray-400">
                          07 Jan 2019, 09:12AM
                        </p>
                      </div>
                      <span className="text-white font-bold">$436</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-white font-medium">
                          Transfer to Stripe
                        </p>
                        <p className="text-xs text-gray-400">
                          07 Jan 2019, 09:12AM
                        </p>
                      </div>
                      <span className="text-white font-bold">$593</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Open Projects */}
            <CardsUltimosCincoVideos />
          </div>
        </div>
      </MainLayout>
    </div>
  );
}
