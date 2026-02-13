export const TabPanel = ({ tabs, activeTab, onTabChange }) => {
    return (
        <div className="flex border-b border-white/5 mb-6">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    className={`px-8 py-4 text-sm font-black uppercase tracking-widest transition-all relative ${activeTab === tab.id
                            ? 'text-pink-400'
                            : 'text-slate-500 hover:text-white'
                        }`}
                    onClick={() => onTabChange(tab.id)}
                >
                    {tab.label}
                    {activeTab === tab.id && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-400 shadow-[0_0_10px_rgba(244,114,182,0.5)]"></div>
                    )}
                </button>
            ))}
        </div>
    );
};
