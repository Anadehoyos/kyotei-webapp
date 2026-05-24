import { CheckIcon } from "@phosphor-icons/react/dist/ssr";
import { Fragment } from "react";

export function ProgressBar({ step }: { step: number }) {
  const steps = ["Organización", "Usuario"];

  return (
    <div className="w-full">
      {/* Fila 1: círculos + línea — independiente de las etiquetas */}
      <div className="flex items-center">
        {steps.map((_, index) => (
          <Fragment key={index}>
            <div
              className={`w-8 h-8 mx-2 rounded-full shrink-0 flex items-center justify-center text-xs font-bold border-2 transition-all duration-300
                ${index + 1 < step ? "bg-ky-accent border-ky-accent text-white" : ""}
                ${index + 1 === step ? "bg-transparent border-ky-accent text-ky-accent" : ""}
                ${index + 1 > step ? "bg-transparent border-ky-border text-ky-faint" : ""}
              `}
            >
              {index + 1 < step ? <CheckIcon /> : index + 1}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-px transition-all duration-300
                  ${index + 1 < step ? "bg-ky-accent" : "bg-ky-border"}
                `}
              />
            )}
          </Fragment>
        ))}
      </div>

      {/* Fila 2: etiquetas — no afectan la línea */}
      <div className="flex justify-between mt-2">
        {steps.map((label, index) => (
          <span
            key={index}
            className={`text-xs transition-colors duration-300
              ${index + 1 <= step ? "text-ky-text" : "text-ky-faint"}
            `}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
