import React from 'react';

const GithubStats = () => {
    return (
        <section id="github-stats" className="py-24 bg-white dark:bg-dark text-white font-poppins">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-4xl font-medium text-center mb-16 relative font-ubuntu text-dark dark:text-white">
                    Github Stats
                    <span className="block w-44 h-1 bg-dark dark:bg-white absolute bottom-[-10px] left-1/2 -translate-x-1/2"></span>
                    <span className="absolute bottom-[-18px] left-1/2 -translate-x-1/2 text-primary bg-white dark:bg-dark px-2 text-xl font-bold">my code life</span>
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-12 justify-items-center">
                    <div className="github-stat w-full max-w-lg hover:scale-105 transition-transform duration-500 rounded-lg overflow-hidden shadow-lg border border-gray-800">
                        <img className="w-full" src="https://github-readme-stats.vercel.app/api/top-langs?username=suraj2320&show_icons=true&locale=en&layout=compact&theme=dark"
                            alt="Github Top Languages" />
                    </div>
                    <div className="github-stat w-full max-w-lg hover:scale-105 transition-transform duration-500 rounded-lg overflow-hidden shadow-lg border border-gray-800">
                        <img className="w-full" src="https://github-readme-stats.vercel.app/api?username=suraj2320&show_icons=true&locale=en&theme=dark"
                            alt="Github User Stats" />
                    </div>
                    <div className="github-stat w-full max-w-lg lg:col-span-2 hover:scale-105 transition-transform duration-500 rounded-lg overflow-hidden shadow-lg border border-gray-800">
                        <img className="w-full" src="https://github-readme-streak-stats.herokuapp.com/?user=Suraj2320&theme=dark"
                            alt="Github Streak" />
                    </div>
                    <div className="github-stat w-full lg:col-span-2 mt-8">
                        <h4 className="text-xl font-bold mb-6 text-dark dark:text-white">Suraj Santosh Pawar's contribution calendar</h4>
                        <img src="https://ghchart.rshah.org/Suraj2320" alt="Contribution Calendar" className="w-full h-auto rounded-lg shadow-md bg-white p-4" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GithubStats;
