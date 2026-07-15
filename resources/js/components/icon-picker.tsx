import { useMemo, useState } from 'react';
import { DynamicIcon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface IconPickerProps {
    name: string;
    defaultValue?: string;
    iconNames: readonly string[];
}

export default function IconPicker({
    name,
    defaultValue,
    iconNames,
}: IconPickerProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState(defaultValue ?? 'WalletIcon');

    const filteredIcons = useMemo(
        () =>
            iconNames.filter((icon) =>
                icon.toLowerCase().includes(search.toLowerCase()),
            ),
        [search, iconNames],
    );

    function handleSelect(iconName: string) {
        setSelected(iconName);
        setOpen(false);
    }

    return (
        <>
            <input type="hidden" name={name} value={selected} />

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <div className="flex h-11 w-11 items-center justify-center rounded-md p-0 ring-1 ring-beige-500 hover:ring-gray-400">
                        <DynamicIcon
                            className="h-5 w-5"
                            name={selected}
                            weight="fill"
                        />
                    </div>
                </PopoverTrigger>

                <PopoverContent className="p-2">
                    <Input
                        placeholder="Search icons..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="mb-2"
                    />

                    <div className="grid grid-cols-5 gap-1">
                        {filteredIcons.map((icon) => (
                            <button
                                key={icon}
                                type="button"
                                onClick={() => handleSelect(icon)}
                                className={cn(
                                    'flex h-9 w-9 items-center justify-center rounded-md hover:bg-gray-100',
                                    selected === icon &&
                                        'bg-grey-100 ring-1 ring-gray-300',
                                )}
                            >
                                <DynamicIcon
                                    className="h-5 w-5"
                                    name={icon}
                                    weight="fill"
                                />
                            </button>
                        ))}

                        {filteredIcons.length === 0 && (
                            <p className="col-span-5 py-4 text-center text-sm text-grey-900">
                                No icons found.
                            </p>
                        )}
                    </div>
                </PopoverContent>
            </Popover>
        </>
    );
}
