export function HeroSection() {
    return (
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/20 to-transparent rounded-full blur-3xl" />
        <div className="relative">
          <h1 className="text-4xl md:text-6xl font-bold text-center text-black dark:text-white mb-6">
            Technical{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-pink-500">
              Expertise
            </span>
          </h1>
          <p className="text-gray-700 dark:text-gray-400 text-center text-lg md:text-xl max-w-2xl mx-auto">
            Building modern web applications with cutting-edge technologies
          </p>
        </div>
      </div>
    );
  }
