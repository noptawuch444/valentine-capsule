import { ColorPicker } from '../ui/ColorPicker';
import { FormField } from '../ui/FormField';

export const ThemeEditor = ({ theme, onChange }) => {
    const updateColor = (colorName, value) => {
        onChange({
            ...theme,
            colors: { ...theme.colors, [colorName]: value }
        });
    };

    const updateFont = (fontType, value) => {
        onChange({
            ...theme,
            fonts: { ...theme.fonts, [fontType]: value }
        });
    };

    const updateBackground = (value) => {
        onChange({ ...theme, background: value });
    };

    return (
        <div className="theme-editor max-w-4xl mx-auto flex flex-col gap-12">
            <div className="space-y-4 text-center">
                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-400 bg-[#334155] px-4 py-2 rounded-full border border-white/5">Aesthetics</span>
                <h2 className="text-4xl font-black text-white">Visual DNA</h2>
                <p className="text-slate-500 font-light">Define the atmosphere and style of your digital collection.</p>
            </div>

            <div className="bg-[#1e293b]/30 backdrop-blur-xl p-10 rounded-[40px] shadow-2xl border border-white/5 space-y-12">
                <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-1.5 h-6 bg-[#334155] rounded-full"></div>
                        <h3 className="text-sm font-black uppercase tracking-widest text-white">Color Palette</h3>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                        <ColorPicker
                            label="Primary Accent"
                            color={theme.colors.primaryRed}
                            onChange={(value) => updateColor('primaryRed', value)}
                        />
                        <ColorPicker
                            label="Secondary Soft"
                            color={theme.colors.secondaryPink}
                            onChange={(value) => updateColor('secondaryPink', value)}
                        />
                        <ColorPicker
                            label="Delicate Highlight"
                            color={theme.colors.lightPink}
                            onChange={(value) => updateColor('lightPink', value)}
                        />
                        <ColorPicker
                            label="Vintage Cream"
                            color={theme.colors.cream}
                            onChange={(value) => updateColor('cream', value)}
                        />
                        <ColorPicker
                            label="Bold Statement"
                            color={theme.colors.deepRed}
                            onChange={(value) => updateColor('deepRed', value)}
                        />
                        <ColorPicker
                            label="Luxury Trim"
                            color={theme.colors.gold}
                            onChange={(value) => updateColor('gold', value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-white/5">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-1.5 h-6 bg-[#475569] rounded-full"></div>
                            <h3 className="text-sm font-black uppercase tracking-widest text-white">Typography Setup</h3>
                        </div>
                        <FormField
                            label="Body Typeface"
                            value={theme.fonts.primary}
                            onChange={(value) => updateFont('primary', value)}
                            placeholder="Outfit"
                        />
                        <FormField
                            label="Display Typeface"
                            value={theme.fonts.secondary}
                            onChange={(value) => updateFont('secondary', value)}
                            placeholder="Playfair Display"
                        />
                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-start gap-3">
                            <div className="mt-0.5 text-[#e63946]">💡</div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-relaxed">
                                แนะนำฟอนต์ยอดนิยม: <strong>'Mali'</strong> (น่ารัก), <strong>'Itim'</strong> (ขี้เล่น), <strong>'Charm'</strong> (โรแมนติก), <strong>'Sriracha'</strong> (กันเอง)
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-1.5 h-6 bg-green-400 rounded-full"></div>
                            <h3 className="text-sm font-black uppercase tracking-widest text-gray-800">Atmosphere</h3>
                        </div>
                        <FormField
                            label="Background Canvas (CSS)"
                            type="textarea"
                            value={theme.background}
                            onChange={updateBackground}
                            placeholder="radial-gradient(circle at center, #ffc2d1 0%, #ff8fab 50%, #c9184a 100%)"
                            rows={3}
                        />
                        <div className="relative group perspective">
                            <div
                                className="h-28 rounded-[24px] shadow-lg transform group-hover:rotate-x-12 transition-transform duration-700 flex items-center justify-center border-4 border-white"
                                style={{ background: theme.background }}
                            >
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white p-2 bg-black/10 backdrop-blur-md rounded-lg">Canvas Preview</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
