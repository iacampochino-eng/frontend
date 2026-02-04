import { Check, ChevronRight } from "lucide-react";
import { steps } from "./steps";

export const renderStepIndicator = (currentStep: number) => (
  <div className="flex items-center justify-center mb-8">
    {steps.map((step, index) => (
      <div key={step.number} className="flex items-center">
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
            currentStep >= step.number
              ? "bg-primary border-primary text-primary-foreground"
              : "border-gray-300 text-gray-500"
          }`}
        >
          {currentStep > step.number ? (
            <Check className="w-5 h-5" />
          ) : (
            <span className="text-sm font-medium">{step.number}</span>
          )}
        </div>
        <div className="ml-3 text-left">
          <p
            className={`text-sm font-medium ${
              currentStep >= step.number ? "text-gray-500" : "text-gray-100"
            }`}
          >
            {step.title}
          </p>
          <p className="text-xs text-gray-500">{step.description}</p>
        </div>
        {index < steps.length - 1 && (
          <ChevronRight className="w-5 h-5 text-gray-400 mx-4" />
        )}
      </div>
    ))}
  </div>
);
