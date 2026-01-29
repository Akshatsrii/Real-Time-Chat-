const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 p-12 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-md text-center relative z-10">
        <div className="grid grid-cols-3 gap-2.5 mb-12 max-w-xs mx-auto">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl ${
                i % 2 === 0 ? "animate-pulse" : ""
              } hover:bg-white/20 hover:scale-105 transition-all duration-500`}
              style={{ 
                animationDelay: `${i * 0.1}s`,
                animationDuration: '3s'
              }}
            />
          ))}
        </div>
        <h2 className="text-4xl font-bold mb-4 text-white drop-shadow-2xl">{title}</h2>
        <p className="text-white/90 text-lg leading-relaxed drop-shadow-lg">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;