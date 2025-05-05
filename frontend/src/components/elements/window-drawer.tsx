"use client";
import { useState } from "react";
import { Drawer } from "vaul";
import { Window } from "@/components/elements/window";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";

interface WindowDrawerProps {
  children?: React.ReactNode;
}

const snapPoints = [0.1, 0.5, 1];

export default function WindowDrawer({ children }: WindowDrawerProps) {
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);
  const [open, setOpen] = useState(true);

  return (
    <Drawer.Root
      modal={false}
      snapPoints={snapPoints}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
      open={open}
      onOpenChange={setOpen}
    >
      <Drawer.Trigger asChild>
        {!open && (
          <Button className="fixed bottom-0 right-0 m-8">
            <Menu />
          </Button>
        )}
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content
          data-testid="content"
          className="h-full min-h-full flex flex-col"
        >
          <div className=" h-full">
            <Window className="rounded-b-none border-b-0 justify-start h-full">
              <Drawer.Title>Title</Drawer.Title>
              <div
                aria-hidden
                className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-4"
              />
              <div className="flex flex-col w-full p-4 pt-5 overflow-y-auto">
                {children}
              </div>
            </Window>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
