
import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { useIsMobile } from "@/hooks/use-mobile"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer"

import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const MobilePopoverContext = React.createContext<{
  title?: string;
  setTitle: (title: string) => void;
}>({
  title: undefined,
  setTitle: () => {},
});

export const MobilePopoverProvider = ({ children }: { children: React.ReactNode }) => {
  const [title, setTitle] = React.useState<string | undefined>(undefined);
  
  return (
    <MobilePopoverContext.Provider value={{ title, setTitle }}>
      {children}
    </MobilePopoverContext.Provider>
  );
};

export const useMobilePopover = () => {
  const context = React.useContext(MobilePopoverContext);
  if (!context) {
    throw new Error("useMobilePopover must be used within a MobilePopoverProvider");
  }
  return context;
};

interface PopoverContentProps extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  mobileTitle?: string;
}

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(({ className, align = "center", sideOffset = 4, mobileTitle, children, ...props }, ref) => {
  const isMobile = useIsMobile();
  const { setTitle } = React.useContext(MobilePopoverContext);

  React.useEffect(() => {
    if (mobileTitle) {
      setTitle(mobileTitle);
    }
  }, [mobileTitle, setTitle]);

  if (isMobile) {
    return (
      <Drawer open={props['data-state'] === 'open'} onOpenChange={(isOpen) => {
        if (!isOpen) {
          const closeEvent = new Event('popper:close');
          window.dispatchEvent(closeEvent);
        }
      }}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader className="px-4">
            <DrawerTitle>{mobileTitle || "Options"}</DrawerTitle>
            <DrawerClose />
          </DrawerHeader>
          <ScrollArea className="px-4 pb-6 max-h-[calc(85vh-4rem)]" orientation="vertical" hideScrollbar={false}>
            <div className="p-1 pb-12">
              {children}
            </div>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          "max-w-[calc(100vw-2rem)] max-h-[85vh] sm:max-w-md",
          className
        )}
        {...props}
      >
        <ScrollArea className="h-full" viewportClassName="max-h-[60vh]" orientation="vertical" hideScrollbar={false}>
          <div className="p-1 pb-6">
            {children}
          </div>
        </ScrollArea>
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
});

PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
