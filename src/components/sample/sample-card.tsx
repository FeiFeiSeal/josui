/*
 * @Author:FeiFeiSeal
 * @Date:2025-04-02 12:09:24
 * @LastEditors:FeiFeiSeal
 * @LastEditTime:2025-05-14 10:44:42
 * @Description:
 */

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { 
  Area, AreaChart, CartesianGrid, XAxis,
  Bar, BarChart , Pie, PieChart, LabelList, Sector
} from "recharts"

import { PieSectorDataItem } from "recharts/types/polar/Pie"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  Calculator,BellRing, Check,
  Calendar as CalendarIcon,
  CreditCard,
  Settings,
  Smile,
  User,
  CircleCheck,
  UserRound,
  Ellipsis,
  Receipt,
  CarFront,
  GraduationCap,
  TrendingUp
} from "lucide-react"


import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

type CardProps = React.ComponentProps<typeof Card>


export function CardA({ className }: { className?: string }) {
  return (
    <Card className={cn('sui-shadow gap-4 ', className)}>
      <CardHeader>
        <CardTitle>Connections</CardTitle>
      </CardHeader>
      <CardContent className="border-y py-4">
      <ul className="flex flex-col gap-4 ">
        <li className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://randomuser.me/api/portraits/men/75.jpg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <p className="font-semibold ">Jane Eyre</p>
            <p className="text-card-foreground/50">25 connections</p>
          </div>
          <CircleCheck className="ml-auto text-card-foreground/50" />
        </li>
        <li className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://randomuser.me/api/portraits/women/73.jpg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <p className="font-semibold ">Jane Williams</p>
            <p className="text-card-foreground/50">65 connections</p>
          </div>
          <CircleCheck className="ml-auto text-card-foreground/50" />
        </li>
        <li className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://randomuser.me/api/portraits/men/1.jpg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <p className="font-semibold ">Axel Rose</p>
            <p className="text-card-foreground/50">425 connections</p>
          </div>
          <CircleCheck className="ml-auto text-card-foreground/50" />
        </li>
        <li className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://randomuser.me/api/portraits/men/15.jpg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <p className="font-semibold ">Johnny Bravo</p>
            <p className="text-card-foreground/50">15 connections</p>
          </div>
          <UserRound className="ml-auto text-card-foreground/50" />
        </li>
      </ul>
      </CardContent>
      <CardFooter>
        <Button className="mx-auto">
          View all connections
        </Button> 
      </CardFooter>
    </Card>
  )
}

export function CardB({ className }: { className?: string }) {
  return (
    <Card className={cn('sui-shadow gap-4 ', className)}>
      <CardHeader>
        <div className="relative px-4 py-2 shadow text-primary-foreground rounded-lg bg-primary">
          <p className="text-xs mb-1">credit Balance</p>
          <p className="font-extrabold text-2xl">$25,215</p>
          <Ellipsis className="absolute right-2 top-1 text-primary-foreground/50" />
        </div>
      </CardHeader>
      <CardContent className="">
      <p className="text-card-foreground/50 text-sm -mt-2 mb-2">Recent</p>
      <ul className="flex flex-col gap-4">
        <li className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://randomuser.me/api/portraits/men/7-5.jpg" />
            <AvatarFallback><Receipt size={18} /></AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <p className="font-semibold ">Bill & Taxes</p>
            <p className="text-card-foreground/50">Today, 16:36</p>
          </div>
          <p className="ml-auto font-extrabold"> -$154.55</p>
        </li>
        <li className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://randomuser.me/api/portraits/men/7-5.jpg" />
            <AvatarFallback><CarFront size={18} /></AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <p className="font-semibold ">Car Energy</p>
            <p className="text-card-foreground/50">23 Jun, 13:03</p>
          </div>
          <p className="ml-auto font-extrabold"> -$154.55</p>
        </li>
        <li className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://randomuser.me/api/portraits/men/7-5.jpg" />
            <AvatarFallback><GraduationCap size={18} /></AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <p className="font-semibold ">Design Course</p>
            <p className="text-card-foreground/50">20 Jun, 09:03</p>
          </div>
          <p className="ml-auto font-extrabold"> -$70.00</p>
        </li>
        <li className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://randomuser.me/api/portraits/men/7-5.jpg" />
            <AvatarFallback><GraduationCap size={18} /></AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <p className="font-semibold ">Design Course</p>
            <p className="text-card-foreground/50">21 Jun, 09:00</p>
          </div>
          <p className="ml-auto font-extrabold"> -$70.00</p>
        </li>
      </ul>
      </CardContent>
    </Card>
  )
}

export function CardC({ className }: { className?: string }) {
  return (
    <Card className={cn('sui-shadow gap-4', className)}>
      <CardHeader>
        <CardTitle>Recent Notifications</CardTitle>
      </CardHeader>
      <CardContent className="px-1 ">
      <ul className="flex flex-col gap-1 ">
        <li className="group hover:bg-primary p-2 rounded-md flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://randomuser.me/api/portraits/women/73.jpg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="group-hover:text-primary-foreground text-sm">
            <p className="font-semibold ">Allie McDonald</p>
            <p className="text-xs text-card-foreground/50 group-hover:text-primary-foreground">Commented on...</p>
          </div>
          <p className="group-hover:text-primary-foreground ml-auto text-card-foreground text-xs">2h</p>
        </li>
        <li className="group hover:bg-primary p-2 rounded-md flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://randomuser.me/api/portraits/men/73.jpg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="group-hover:text-primary-foreground  text-sm">
            <p className="font-semibold ">John Isner</p>
            <p className="text-xs text-card-foreground/50 group-hover:text-primary-foreground">Commented on...</p>
          </div>
          <p className="ml-auto text-card-foreground/50 group-hover:text-primary-foreground text-xs">4h</p>
        </li>
        <li className="group hover:bg-primary p-2 rounded-md flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://randomuser.me/api/portraits/men/73.jpg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="group-hover:text-primary-foreground text-sm">
            <p className="font-semibold ">John Isner</p>
            <p className="text-xs text-card-foreground/50 group-hover:text-primary-foreground">Commented on...</p>
          </div>
          <p className="ml-auto text-card-foreground/50 group-hover:text-primary-foreground text-xs">4h</p>
        </li>
        <li className="group hover:bg-primary p-2 rounded-md flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://randomuser.me/api/portraits/men/73.jpg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="group-hover:text-primary-foreground text-sm">
            <p className="font-semibold ">John Isner</p>
            <p className="text-xs text-card-foreground/50 group-hover:text-primary-foreground">Commented on...</p>
          </div>
          <p className="ml-auto text-card-foreground/50 group-hover:text-primary-foreground text-xs">4h</p>
        </li>
        <li className="group hover:bg-primary p-2 rounded-md flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://randomuser.me/api/portraits/women/73.jpg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="group-hover:text-primary-foreground text-sm">
            <p className="font-semibold ">Allie McDonald</p>
            <p className="text-xs text-card-foreground/50 group-hover:text-primary-foreground">Commented on...</p>
          </div>
          <p className="ml-auto text-card-foreground/50 group-hover:text-primary-foreground text-xs">6h</p>
        </li>
        <li className="group hover:bg-primary p-2 rounded-md flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://randomuser.me/api/portraits/women/13.jpg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="group-hover:text-primary-foreground text-sm">
            <p className="font-semibold ">Jessica Lopez</p>
            <p className="text-xs text-card-foreground/50 group-hover:text-primary-foreground">Commented on...</p>
          </div>
          <p className="ml-auto text-card-foreground/50 group-hover:text-primary-foreground text-xs">12h</p>
        </li>
        <li className="group hover:bg-primary p-2 rounded-md flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://randomuser.me/api/portraits/men/13.jpg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="group-hover:text-primary-foreground text-sm">
            <p className="font-semibold ">Axel Rose</p>
            <p className="text-xs text-card-foreground/50 group-hover:text-primary-foreground">Commented on...</p>
          </div>
          <p className="ml-auto text-card-foreground/50 group-hover:text-primary-foreground text-xs">13h</p>
        </li>
      </ul>
      </CardContent>
    </Card>
  )
}

export function CardWithForm({className}:{className?:string}) {
  return (
    <Card className={cn('sui-shadow', className)}>
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  )
}


const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
]

export function CardDemo({ className, ...props }: CardProps) {
  return (
    <Card className={cn("sui-shadow", className)} {...props}>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex flex-wrap items-center justify-center gap-4 rounded-md border p-4">
          <BellRing />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Push Notifications
            </p>
            <p className="text-sm text-muted-foreground">
              Send notifications to device.
            </p>
          </div>
          <Switch />
        </div>
        <div>
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Check /> Mark all as read
        </Button>
      </CardFooter>
    </Card>
  )
}


export function CalendarDemo({ className }: {className?: string}) {

  return (
    <Calendar
      mode="single"
      className={cn("sui-shadow bg-card rounded-md border shadow max-w-64 mx-auto", className)}
    />
  )
}

export function CommandDemo({ className }: { className?: string }) {
  return (
    <Command className={cn("rounded-lg border sui-shadow", className)}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <CalendarIcon />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <Smile />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem disabled>
            <Calculator />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <User />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}


export function RadioGroupDemo({className}: {className?: string}) {
  return (
    <Card className={cn('px-4', className)}>
      <RadioGroup defaultValue="comfortable">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="default" id="r1" />
          <Label htmlFor="r1">Default</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="comfortable" id="r2" />
          <Label htmlFor="r2">Comfortable</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="compact" id="r3" />
          <Label htmlFor="r3">Compact</Label>
        </div>
      </RadioGroup>
    </Card>
  )
}


export function BadgeDemo({className}: {className?: string}) {
  return (
    <div className={cn('flex flex-wrap gap-2 p-4', className)}>
      <Badge>Badge</Badge>
      <Badge variant="secondary">Badge</Badge>
      <Badge variant="outline">Badge</Badge>
      <Badge variant="destructive">Badge</Badge>
      <Badge variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white">Badge</Badge>
    </div>
  )
}

export function InputDemo({className}: {className?: string}) {
  return (
    <Card className={cn('px-4', className)}>
      <div className="grid gap-4">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Dimensions</h4>
          <p className="text-sm text-muted-foreground">
            Set the dimensions for the layer.
          </p>
        </div>
        <form className="grid gap-2">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="width">Width</Label>
            <Input
              id="width"
              defaultValue="100%"
              className="col-span-2 h-8"
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="maxWidth">Max. width</Label>
            <Input
              id="maxWidth"
              defaultValue="300px"
              className="col-span-2 h-8"
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="height">Height</Label>
            <Input
              id="height"
              defaultValue="25px"
              className="col-span-2 h-8"
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="maxHeight">Max. height</Label>
            <Input
              id="maxHeight"
              defaultValue="none"
              className="col-span-2 h-8"
            />
          </div>
        </form>
      </div>
    </Card>
  )
}

export function TabsDemo({className}: {className?: string}) {
  return (
    <Card className={cn('sui-shadow px-2 h-full', className)}>
      <Tabs defaultValue="account">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Pedro Duarte" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">User Name</Label>
                <Input id="username" defaultValue="@peduarte" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="userEmail">User Email</Label>
                <Input id="userEmail" defaultValue="contact@josui.design" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="userPhone">User Phone</Label>
                <Input id="userPhone" defaultValue="+1 (555) 555-5555" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="userAddress">User Address</Label>
                <Input id="userAddress" defaultValue="[Street Address or PO Box], [City], [State/Province] [Postal Code], [Country]" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="URLs">URLs</Label>
                <Input id="URLs" defaultValue="https://josui.design/" />
                <Input id="URLs-2" defaultValue="https://josui.design/privacy" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="message">Your message</Label>
                <Textarea placeholder="Type your message here." id="message" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </Card>
  )
}

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartStackedDemo({ className }: { className?: string }) {
  return (
    <Card className={cn("sui-shadow", className)}>
      <CardHeader>
        <CardTitle>Area Chart - Stacked</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="mobile"
              type="natural"
              fill="var(--color-mobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
const barData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
  { month: "July", desktop: 350 },
  { month: "August", desktop: 214 },
  { month: "September", desktop: 99 },
  { month: "October", desktop: 186 },
  { month: "November", desktop: 277 },
  { month: "December", desktop: 200 },
]
const barConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function BarDemo({ className }: { className?: string }) {
  return (
    <Card className={cn("sui-shadow", className)}>
      <CardHeader>
        <CardTitle>Bar Chart - Label</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        <ChartContainer config={barConfig}>
          <BarChart
            accessibilityLayer
            data={barData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={8}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}


export function BarDemo2({ className }: { className?: string }) {
  return (
    <Card className={cn('sui-shadow', className)}>
      <CardHeader>
        <CardTitle>Bar Chart - Multiple</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}

const pieData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
]


const pieConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig


export function PieChartDemo({ className }: { className?: string }) {
  return (
    <Card className={cn('flex flex-col sui-shadow', className)}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Donut Active</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={pieConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={pieData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={0}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <Sector {...props} outerRadius={outerRadius + 10} />
              )}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}