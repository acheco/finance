import { Link } from '@inertiajs/react';
import { DotsThreeIcon } from '@phosphor-icons/react';
import {
    destroy,
    store,
} from '@/actions/App/Http/Controllers/Settings/HiddenCategoryController';
import CategoryForm from '@/components/modals/CategoryForm';
import DeleteCategoryModal from '@/components/modals/delete-category';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DynamicIcon } from '@/components/ui/icon';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import type { Category } from '@/types/category';
import type { ColumnDef } from '@/types/datatable';

export const CategoryColumns: ColumnDef<Category>[] = [
    {
        key: 'name',
        header: 'Name',
        render: (category) => (
            <div className="flex items-center gap-2">
                <div
                    className={cn(
                        `flex h-10 w-10 items-center justify-center rounded-full`,
                    )}
                    style={{ backgroundColor: category.color || '#201F24' }}
                >
                    {category.icon && (
                        <DynamicIcon
                            name={category.icon}
                            color="white"
                            size={16}
                            weight="fill"
                        />
                    )}
                </div>
                <div>
                    <p className="preset-4-bold text-grey-900">
                        {category.name}
                    </p>
                </div>
            </div>
        ),
    },
    {
        key: 'owner',
        header: 'Owner',
        render: (category) => (
            <p className="preset-5 text-grey-500">
                {category.user_id ? 'Me' : 'System'}
            </p>
        ),
    },
    {
        key: 'actions',
        header: '',
        render: (category) => {
            return category.user_id ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <span className="sr-only">Open menu</span>
                            <DotsThreeIcon size={24} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuItem asChild>
                            <CategoryForm category={category}>
                                <Button variant="ghost">Edit Category</Button>
                            </CategoryForm>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <DeleteCategoryModal category={category.id} />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : category.isHidden ? (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href={destroy(category.id)}
                            className="flex cursor-pointer gap-2"
                            preserveScroll={true}
                            preserveState={true}
                        >
                            <DynamicIcon
                                name="EyeSlashIcon"
                                weight="fill"
                                size={16}
                            />
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent>Show category</TooltipContent>
                </Tooltip>
            ) : (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href={store(category.id)}
                            className="flex cursor-pointer gap-2"
                            preserveScroll={true}
                            preserveState={true}
                        >
                            <DynamicIcon
                                name="EyeIcon"
                                weight="regular"
                                size={16}
                            />
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent>Hide category</TooltipContent>
                </Tooltip>
            );
        },
    },
];
