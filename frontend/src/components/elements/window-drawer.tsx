"use client";

import { useState } from "react";
import { Drawer } from "vaul";
import { Window } from "@/components/elements/window";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";

interface WindowDrawerProps {
  children?: React.ReactNode;
}

const snapPoints = [0.4, 0.6, 0.8, 1];

export default function WindowDrawer({ children }: WindowDrawerProps) {
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);
  const [open, setOpen] = useState(true);

  return (
    <Drawer.Root
      snapPoints={snapPoints}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
      open={open}
      onOpenChange={setOpen}
    >
      <Drawer.Trigger asChild>
        <Button className="fixed right-0 top-0 m-6 size-10 rounded-full">
          <Menu />
        </Button>
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content
          data-testid="content"
          className="h-[100dvh] overflow-hidden fixed w-full"
        >
          <div className="h-[100dvh] flex flex-col">
            <Drawer.Title className="hidden">Title</Drawer.Title>

            <Window
              className="rounded-b-none border-b-0 justify-start flex flex-col flex-1 overflow-hidden"
              padding={2}
            >
              <div
                aria-hidden
                className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 my-4"
              />
              <div className="flex flex-col w-full p-4 pt-5 overflow-y-auto flex-1">
                {children}
              </div>
            </Window>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
