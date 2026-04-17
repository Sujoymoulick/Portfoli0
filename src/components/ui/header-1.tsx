'use client';
import React from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useScroll } from '@/components/ui/use-scroll';
import { createPortal } from 'react-dom';

const CloseIcon = ({ size = 20 }: { size?: number }) => (
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

const MoreIcon = ({ size = 20 }: { size?: number }) => (
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
);

export function Header() {
	const [open, setOpen] = React.useState(false);
	const scrolled = useScroll(10);
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	const links = [
		{
			label: 'About',
			href: '#about',
		},
		{
			label: 'Journey',
			href: '#journey',
		},
		{
			label: 'Certificates',
			href: '#certificates',
		},
		{
			label: 'Works',
			href: '#works',
		},
		{
			label: 'Contact',
			href: '#contact',
		},
	];

	React.useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	if (!mounted) return null;

	return (
		<header
			className={cn('fixed top-0 z-50 w-full border-b border-transparent transition-all duration-300', {
				'bg-black/80 backdrop-blur-lg border-white/10 py-2': scrolled,
				'bg-transparent py-4': !scrolled
			})}
		>
			<nav className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-6 md:px-10">
				<div className="flex items-center gap-2">
					<div className="font-black text-2xl tracking-tighter text-white">SM.</div>
				</div>
				<div className="hidden items-center gap-4 md:flex">
					{links.map((link) => (
						<a
							key={link.label}
							className={cn(buttonVariants({ variant: 'ghost' }), "text-xs font-bold tracking-widest uppercase text-[#a1a1aa] hover:text-white transition-colors")}
							href={link.href}
						>
							{link.label}
						</a>
					))}
					<div className="w-[1px] h-4 bg-white/10 mx-2" />
					<a
						href="src/assets/My_resume_2026.pdf"
						target="_blank"
						rel="noopener noreferrer"
						download="Sujoy_Moulick_Resume.pdf"
						className={cn(buttonVariants({ variant: 'outline' }), "border-white/10 bg-white/5 hover:bg-white/10 text-xs font-bold tracking-widest uppercase px-6 rounded-full")}
					>
						Resume
					</a>
					<a
						href="https://WA.me/918942841651"
						target="_blank"
						rel="noopener noreferrer"
						className={cn(buttonVariants(), "bg-white text-black hover:bg-neutral-200 text-xs font-bold tracking-widest uppercase px-8 rounded-full")}
					>
						Let's Talk
					</a>
				</div>
				<Button
					size="icon"
					variant="ghost"
					onClick={() => setOpen(!open)}
					className="md:hidden text-white hover:bg-white/10 rounded-full w-10 h-10"
					aria-expanded={open}
					aria-controls="mobile-menu"
					aria-label="Toggle menu"
				>
					{open ? <CloseIcon size={20} /> : <MoreIcon size={20} />}
				</Button>
			</nav>
			<MobileMenu open={open} onClose={() => setOpen(false)} className="flex flex-col justify-between gap-8 pt-10">
				<div className="grid gap-y-4">
					{links.map((link) => (
						<a
							key={link.label}
							onClick={() => setOpen(false)}
							className={cn(
								buttonVariants({
									variant: 'ghost',
									className: 'justify-start text-4xl font-black tracking-tighter uppercase p-0 h-auto hover:bg-transparent hover:text-white text-[#a1a1aa] transition-colors',
								})
							)}
							href={link.href}
						>
							{link.label}
						</a>
					))}
				</div>
				<div className="flex flex-col gap-4 mb-20">
					<a
						href="/My_resume_2026.pdf"
						target="_blank"
						rel="noopener noreferrer"
						download="Sujoy_Moulick_Resume.pdf"
						className={cn(buttonVariants({ variant: 'outline' }), "w-full bg-white/5 border-white/10 text-xs font-bold tracking-widest uppercase py-6 rounded-2xl text-center")}
					>
						Download Resume
					</a>
					<a
						href="https://WA.me/918942841651"
						target="_blank"
						rel="noopener noreferrer"
						className={cn(buttonVariants(), "w-full bg-white text-black text-xs font-bold tracking-widest uppercase py-6 rounded-2xl text-center")}
					>
						Contact Me
					</a>
				</div>
			</MobileMenu>
		</header>
	);
}

type MobileMenuProps = React.ComponentProps<'div'> & {
	open: boolean;
	onClose: () => void;
};

function MobileMenu({ open, onClose, children, className, ...props }: MobileMenuProps) {
	const [mounted, setMounted] = React.useState(false);
	React.useEffect(() => { setMounted(true); }, []);

	if (!open || !mounted || typeof window === 'undefined') return null;

	return createPortal(
		<div
			id="mobile-menu"
			className={cn(
				'bg-black/98 backdrop-blur-2xl',
				'fixed inset-0 top-0 z-[100] flex flex-col overflow-hidden md:hidden px-8 pt-24',
			)}
		>
			<Button
				size="icon"
				variant="ghost"
				onClick={onClose}
				className="absolute top-6 right-6 text-white hover:bg-white/10 rounded-full w-12 h-12"
			>
				<CloseIcon size={28} />
			</Button>
			<div
				data-slot={open ? 'open' : 'closed'}
				className={cn(
					'data-[slot=open]:animate-in data-[slot=open]:slide-in-from-bottom-5 duration-500 ease-out',
					'size-full flex flex-col',
					className,
				)}
				{...props}
			>
				{children}
			</div>
		</div>,
		document.body,
	);
}
