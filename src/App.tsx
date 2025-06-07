"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Truck,
  Calendar,
  MapPin,
  Star,
  Zap,
  Shield,
  Clock,
  
} from "lucide-react";
import { useSkipsApi } from "@/hooks/use-skips-api";
import { ErrorBoundary } from './components/ErrorBoundary';


export default function SkipSizeSelector() {
  const { skips, loading, error, refetch } = useSkipsApi("NR32", "Lowestoft");
  const [selectedSkip, setSelectedSkip] = useState<string | null>(null);
  const [hoveredSkip, setHoveredSkip] = useState<string | null>(null);

  const progressSteps = [
    { name: "Postcode", completed: true },
    { name: "Waste Type", completed: true },
    { name: "Select Skip", completed: false, current: true },
    { name: "Permit Check", completed: false },
    { name: "Choose Date", completed: false },
    { name: "Payment", completed: false },
  ];

  const currentStepIndex = progressSteps.findIndex((step) => step.current);
  const progressPercentage =
    ((currentStepIndex + 1) / progressSteps.length) * 100;

  const features = [
    { icon: Shield, text: "Fully Insured" },
    { icon: Clock, text: "Same Day Delivery" },
    { icon: Zap, text: "Quick Collection" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center relative overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-300 rounded-full opacity-30 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="text-center z-10">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600 mx-auto animate-spin-reverse"></div>
          </div>
          <div className="space-y-2">
            <p className="text-xl font-semibold text-gray-700">
              Loading skip options...
            </p>
            <p className="text-gray-500 animate-bounce">
              Finding the perfect skips for you
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6 animate-fade-in">
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-400 text-yellow-800 px-6 py-4 rounded-lg mb-6 shadow-lg animate-shake">
            <p className="font-medium flex items-center">
              <Zap className="h-5 w-5 mr-2" />
              Connection Issue
            </p>
            <p className="text-sm mt-2">{error}</p>
          </div>
          <div className="space-x-3">
            <Button
              onClick={refetch}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              Retry API Call
            </Button>
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="hover:scale-105 transition-transform duration-200"
            >
              Refresh Page
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        {/* Header */}
        <div className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 relative z-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-3 group">
                <div className="relative">
                  <Truck className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute -inset-1 bg-blue-600/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  WeWantWaste
                </h1>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-600 bg-white/50 px-2 sm:px-3 py-1 sm:py-2 rounded-full">
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
                  <span className="hidden sm:inline">
                    LE10 1SH • Garden Waste
                  </span>
                  <span className="sm:hidden">LE10 1SH</span>
                </div>
              </div>
            </div>
            {/* Mobile features row */}
            <div className="flex justify-center space-x-4 mt-3 sm:hidden">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-1 text-xs text-gray-600"
                >
                  <feature.icon className="h-3 w-3 text-green-500" />
                  <span className="hidden xs:inline">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white/80 backdrop-blur-md border-b border-white/20 relative z-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="mb-3 sm:mb-4">
              <Progress
                value={progressPercentage}
                className="h-2 sm:h-3 bg-gray-200/50"
              />
            </div>
            <div className="flex justify-between">
              {progressSteps.map((step, index) => (
                <div key={step.name} className="flex flex-col items-center group">
                  <div
                    className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium transition-all duration-500 ${
                      step.completed
                        ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                        : step.current
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step.completed ? (
                      <Check className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 animate-bounce-in" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <span
                    className={`mt-1 sm:mt-2 text-xs font-medium transition-colors duration-300 text-center ${
                      step.current ? "text-blue-600" : "text-gray-500"
                    }`}
                  >
                    <span className="hidden sm:inline">{step.name}</span>
                    <span className="sm:hidden">{step.name.split(" ")[0]}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10">
          <div className="text-center mb-8 sm:mb-12 animate-fade-in-up">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-3 sm:mb-4">
              Choose Your Perfect Skip Size
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Select the skip size that best matches your project needs. All
              prices include delivery, collection, and disposal with our premium
              service guarantee.
            </p>
            <div className="mt-4 sm:mt-6 hidden sm:flex justify-center space-x-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 text-sm text-gray-600 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <feature.icon className="h-4 w-4 text-blue-500" />
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skip Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
            {skips.map((skip, index) => (
              <Card
                key={skip.id}
                className={`relative cursor-pointer transition-all duration-300 group animate-fade-in-up
                  ${selectedSkip === skip.id
                    ? "ring-2 ring-blue-500 shadow-xl bg-gradient-to-br from-blue-100 via-purple-100 to-purple-50 scale-[1.03]"
                    : "hover:shadow-lg hover:scale-[1.02] bg-white/80 backdrop-blur-sm border border-gray-200"}
                `}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedSkip(skip.id)}
                onMouseEnter={() => setHoveredSkip(skip.id)}
                onMouseLeave={() => setHoveredSkip(null)}
              >
                {skip.popular && (
                  <div className="absolute -top-3 left-6 z-20">
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg animate-bounce-in">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                {selectedSkip === skip.id && (
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-20 pointer-events-none"></div>
                )}

                <CardContent className="p-0 relative">
                  <div className="relative overflow-hidden">
                    <img
                      src={`/assets/${skip.capacity.match(/\d+/)?.[0]}-yarder-skip.jpg`}
                      alt={skip.name}
                      onError={e => {
                        const size = skip.capacity.match(/\d+/)?.[0];
                        if (size && !e.currentTarget.src.endsWith(`/${size}.jpg`)) {
                          e.currentTarget.src = `/assets/${size}.jpg`;
                        } else if (!e.currentTarget.src.endsWith("/placeholder.svg")) {
                          e.currentTarget.src = "/placeholder.svg";
                        }
                      }}
                      className={`w-full h-40 sm:h-48 lg:h-52 object-cover rounded-t-xl transition-transform duration-700
                      ${hoveredSkip === skip.id ? "scale-110" : "scale-100"}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                      <Badge
                        variant="secondary"
                        className="bg-white/90 text-gray-900 shadow-lg backdrop-blur-sm text-xs sm:text-sm"
                      >
                        {skip.capacity}
                      </Badge>
                    </div>
                    {selectedSkip === skip.id && (
                      <div className="absolute top-3 sm:top-4 left-3 sm:left-4 animate-bounce-in z-10">
                        <div className="w-7 h-7 sm:w-9 sm:h-9 bg-green-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                          <Check className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {skip.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 sm:mb-4 leading-relaxed">
                      {skip.description}
                    </p>

                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      <div className="flex items-center text-gray-500 text-xs sm:text-sm">
                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-blue-500" />
                        <span className="hidden sm:inline">{skip.duration}</span>
                        <span className="sm:hidden">14 days</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        £{skip.price}
                      </div>
                      <Button
                        variant={selectedSkip === skip.id ? "default" : "outline"}
                        size="sm"
                        className={`min-w-[110px] transition-all duration-300 text-xs sm:text-sm rounded-full px-6
                          ${selectedSkip === skip.id
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg border-0 hover:from-blue-700 hover:to-purple-700"
                            : "bg-white text-gray-900 border border-gray-300 shadow-sm hover:bg-gray-50"}
                        `}
                      >
                        {selectedSkip === skip.id ? (
                          <>
                            <Check className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                            Selected
                          </>
                        ) : (
                          <>
                            <span className="hidden sm:inline">Select Skip</span>
                            <span className="sm:hidden">Select</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Selected Skip Summary */}
          {selectedSkip && (
            <div className="bg-white/80 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 border border-white/20 animate-slide-up">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-3 sm:mr-4 animate-bounce-in">
                  <Check className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
                  Your Selection
                </h3>
              </div>
              {(() => {
                const selected = skips.find((skip) => skip.id === selectedSkip);
                return selected ? (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50 p-4 sm:p-6 rounded-lg sm:rounded-xl space-y-3 sm:space-y-0">
                    <div className="flex-1">
                      <p className="text-lg sm:text-xl font-semibold text-gray-900">
                        {selected.name}
                      </p>
                      <p className="text-gray-600 text-sm sm:text-base">
                        {selected.duration}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1 hidden sm:block">
                        {selected.description}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        £{selected.price}
                      </p>
                      <p className="text-gray-500 text-xs sm:text-sm">
                        All inclusive
                      </p>
                    </div>
                  </div>
                ) : null;
              })()}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 animate-fade-in">
            <Button
              variant="outline"
              className="w-full sm:w-auto flex items-center justify-center bg-white text-black rounded-full shadow font-medium px-6 py-2 hover:bg-gray-50 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-blue-400 transition-all duration-300 border-0"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>

            <Button
              disabled={!selectedSkip}
              className={`w-full sm:w-auto flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 ${!selectedSkip ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Continue
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
