import { Link, router } from '@inertiajs/react';
import { TipJarIcon } from '@phosphor-icons/react';
import PotController from '@/actions/App/Http/Controllers/PotController';
import FormModal from '@/components/form-modal';
import PotCard from '@/components/pots/pot-card';
import PotForm from '@/components/pots/pot-form';
import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import Header from '@/components/ui/header';
import AppLayout from '@/layouts/app-layout';
import type { PotPageProps } from '@/types/pot';

export default function index({
  pot,
  pots,
  mode,
  themes,
  openModal,
}: PotPageProps) {
  const handleClose = () => {
    router.visit(PotController.index().url, {
      preserveState: true,
      preserveScroll: true,
      replace: true,
    });
  };

  return (
    <AppLayout>
      <Header title="Pots" classname="mb-8">
        <Button size="xl" asChild>
          <Link href={PotController.create().url}>+ Add New Pot</Link>
        </Button>
      </Header>

      {pots.length === 0 ? (
        <Empty className="border border-dashed">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <TipJarIcon weight="fill" />
            </EmptyMedia>
            <EmptyTitle>No Pots</EmptyTitle>
            <EmptyDescription>
              Create a pot to set savings targets. These can help keep you on
              track as you save for special purchases.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button size="xl" asChild>
              <Link href={PotController.create().url}>+ Add New Pot</Link>
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {pots.map((pot) => (
            <PotCard key={pot.id} pot={pot} />
          ))}
        </div>
      )}

      <FormModal open={openModal} handleClose={handleClose}>
        <PotForm mode={mode} themes={themes} pot={pot} />
      </FormModal>
    </AppLayout>
  );
}
