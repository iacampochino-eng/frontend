
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSession } from "@/context/useSession";

type FloatingActionMenuProps = {
  options: {
    label: string;
    onClick: () => void;
    Icon?: React.ReactNode;
  }[];
  className?: string;
};

const FloatingActionMenu = ({
  options,
  className,
}: FloatingActionMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSession();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={cn("fixed bottom-0 right-1", className)}>
      <Button
        onClick={toggleMenu}
        className="w-10 h-10 rounded-full bg-[#11111198] hover:bg-[#111111d1] shadow-[0_0_20px_rgba(0,0,0,0.2)] "
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        >
          <div className="relative h-[38px] w-[38px]">
            <Avatar className="h-full w-full p-0 m-0">
              <AvatarImage
                src="https://xnbukikosdcaggqnvybb.supabase.co/storage/v1/object/public/avatar//farmer.png"
                alt="profile"
                className="h-full w-full object-cover"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs font-bold rounded-full z-10 pointer-events-none">
              {user?.username?.slice(0, 4).toUpperCase() || "CN"}
            </div>
          </div>
        </motion.div>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
            transition={{
              duration: 0.4,
              type: "spring",
              stiffness: 300,
              damping: 20,
              delay: 0.05,
            }}
            className="absolute top-full right-0 mt-3"
          >
            <div className="flex flex-col items-end gap-2">
              {options.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{
                    duration: 0.25,
                    delay: index * 0.05,
                  }}
                >
                  <Button
                    onClick={option.onClick}
                    size="sm"
                    className="flex items-center gap-2 bg-[#11111198] hover:bg-[#111111d1] shadow-[0_0_20px_rgba(0,0,0,0.2)] border-none rounded-xl backdrop-blur-sm"
                  >
                    {option.Icon}
                    <span>{option.label}</span>
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingActionMenu;
