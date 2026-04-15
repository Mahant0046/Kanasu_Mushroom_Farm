const WhatsAppFloat = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/919876543210', '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Chat on WhatsApp"
    >
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 group-hover:blur-2xl transition-all duration-500"></div>
        
        {/* Main button */}
        <div className="relative bg-green-500 hover:bg-green-600 p-4 rounded-full shadow-2xl group-hover:shadow-green-500/50 group-hover:shadow-3xl transition-all duration-500 group-hover:scale-110">
          {/* WhatsApp SVG Icon */}
          <svg
            viewBox="0 0 32 32"
            className="h-8 w-8 text-white"
            fill="currentColor"
          >
            <path d="M16 2C8.268 2 2 8.268 2 16c0 2.616.674 5.074 1.857 7.22L2.5 29.5l6.368-1.643C10.966 28.82 13.418 29.5 16 29.5c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5c-2.236 0-4.38-.55-6.308-1.568l-4.128 1.066 1.12-4.028C5.658 21.022 5 18.574 5 16c0-6.065 4.935-11 11-11s11 4.935 11 11-4.935 11-11 11zm6.5-8.5c-.36-.18-2.12-1.04-2.44-1.16-.32-.12-.56-.18-.8.18-.24.36-.94 1.16-1.14 1.4-.2.24-.42.28-.78.1-.36-.18-1.52-.56-2.9-1.8-1.06-.96-1.78-2.14-1.98-2.5-.2-.36-.02-.56.16-.74.16-.16.36-.42.54-.64.18-.22.24-.36.36-.6.12-.24.06-.46-.02-.64-.08-.18-.8-1.94-1.1-2.66-.28-.68-.56-.6-.8-.6-.2 0-.44-.02-.68-.02-.24 0-.62.08-.94.4-.32.32-1.22 1.2-1.22 2.92 0 1.72 1.26 3.38 1.44 3.62.18.24 2.48 3.78 6 5.3 2.52 1.08 3.54.86 4.18.8.64-.06 2.12-.86 2.42-1.7.3-.84.3-1.56.22-1.72-.08-.16-.3-.26-.66-.44z"/>
          </svg>
        </div>

        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          <span className="text-sm font-medium">Chat with us</span>
          <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-l-8 border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent -ml-1"></div>
        </div>

        {/* Pulse ring */}
        <div className="absolute inset-0 rounded-full border-2 border-green-400 animate-ping opacity-20"></div>
      </div>
    </button>
  );
};

export default WhatsAppFloat;
