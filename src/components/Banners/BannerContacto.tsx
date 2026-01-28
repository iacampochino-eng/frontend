import { Card, CardContent } from "../ui/card";
import { Headset } from "lucide-react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

export const BannerContacto = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-r from-purple-600 to-pink-600 border-0 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Headset className="h-10 w-10" />
              <div>
                <h3 className="text-xl font-semibold mb-1">
                  ¿Tenés problemas técnicos?
                </h3>
                <p className="text-purple-100">
                  Comunicate con nuestra area de soporte y te ayudamos.
                </p>
              </div>
            </div>
            <Button
              onClick={() => {
                window.location.href =
                  "https://api.whatsapp.com/send?phone=1160047133&text=Hola%2C%20quiero%20consultar%20algo";
              }}
              variant="secondary"
              className="bg-black text-white hover:bg-gray-900"
            >
              Contacto
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
