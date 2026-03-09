import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export function useToastFlash() {
  const { props } = usePage<{
    flash: {
      success?: string;
      error?: string;
      warning?: string;
      info?: string;
    };
  }>();

  useEffect(() => {
    const { flash } = props;

    if (flash?.success) {
      toast.success(flash.success);
    }

    if (flash?.error) {
      toast.error(flash.error);
    }

    if (flash?.warning) {
      toast.warning(flash.warning);
    }

    if (flash?.info) {
      toast.info(flash.info);
    }
  }, [props, props.flash]);
}
