import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, X } from "lucide-react"; // Import the Terminal and X icons
import { Button } from "@/components/ui/button";

function Alerthead({ head, desc }) { // props
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    if (head && desc) {
      setIsVisible(true);
    }
  }, [head, desc]);

  if (!isVisible || !head || !desc) {
    return null; // Do not render if alert is dismissed or props are missing
  }

  return (
    <div className="fixed top-0 left-0 w-full z-50  text-sm text-green-800 rounded-lg bg-green-50 dark:bg-green-900 dark:text-green-400" role = "alert" >
        <Alert className="relative">
          <Terminal className="h-4 w-4 relative md:absolute " /> {/* Terminal icon */}
          <AlertTitle>{head}</AlertTitle>
          <AlertDescription>{desc}</AlertDescription>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-6 w-6 p-0"
            onClick={() => setIsVisible(false)} // Dismiss alert
          >
            <X className="h-4 w-4" /> {/* Close icon */}
            <span className="sr-only">Dismiss</span>
          </Button>
        </Alert>
    </div >
  );
}

Alerthead.propTypes = {
  head: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};

export default Alerthead;