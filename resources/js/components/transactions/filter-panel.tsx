import { FunnelIcon, SortAscendingIcon } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { FilterPanelProps } from '@/types';

export default function FilterPanel({
  searchValue,
  handleSearchChange,
  currentSort,
  handleSortChange,
  currentCategory,
  handleCategoryChange,
  categories,
  sortOptions,
}: FilterPanelProps) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <Input
        placeholder="Search transactions"
        type="search"
        className="max-w-[320px]"
        value={searchValue}
        onChange={handleSearchChange}
      />

      <div className="hidden flex-row items-center gap-4 md:flex">
        <Field orientation="horizontal" className="hidden md:flex">
          <FieldLabel htmlFor="sort" className="font-normal">
            Sort by
          </FieldLabel>
          <Select onValueChange={handleSortChange} defaultValue={currentSort}>
            <SelectTrigger>
              <SelectValue id="sort" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field orientation="horizontal" className="hidden md:flex">
          <FieldLabel htmlFor="sort" className="font-normal">
            Category
          </FieldLabel>
          <Select
            onValueChange={handleCategoryChange}
            defaultValue={currentCategory}
          >
            <SelectTrigger>
              <SelectValue id="category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={String(category.id)}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>

      <div className="flex flex-row gap-4 md:hidden">
        <Field>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <SortAscendingIcon size={24} weight="fill" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup
                value={currentSort}
                onValueChange={handleSortChange}
              >
                {sortOptions.map((option) => (
                  <DropdownMenuRadioItem
                    value={option.value}
                    key={option.value}
                  >
                    {option.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </Field>

        <Field>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <FunnelIcon size={24} weight="fill" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup
                value={currentCategory}
                onValueChange={handleCategoryChange}
              >
                <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                {categories.map((category) => (
                  <DropdownMenuRadioItem
                    value={String(category.id)}
                    key={category.id}
                  >
                    {category.name}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </Field>
      </div>
    </div>
  );
}
