import OfficialProject from './official-examples/empty-demo';
import OfficialAvatarExample from './official-examples/empty-avatar';
import OfficialInputGroupExample from './official-examples/empty-input-group';
import { EmptyRtl as OfficialRtl } from './official-examples/empty-rtl';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconFolderCode, IconCloud, IconBell } from '@tabler/icons-react';
import { ArrowUpRightIcon, RefreshCcwIcon, PlusIcon, SearchIcon, CircleDashedIcon, FolderIcon } from 'lucide-react';
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from '@empty';
import { Button, LinkButton } from '@button';
import { Avatar, AvatarImage, AvatarFallback } from '@avatar';
import { avatarCustom } from '@avatar-customizations';
import { InputGroup, InputGroupInput, InputGroupAddon } from '@input-group';
import { Kbd } from '@kbd';
import { emptyCustom, emptyDynamic } from '@empty-customizations';
const meta = { title: 'Components/Empty', component: Empty, tags: ['parity'], decorators: [Story => <main id="parity-root"><Story /></main>] } satisfies Meta<typeof Empty>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Demo: Story = { parameters: { originalExample: "empty-demo" }, render: () => <OfficialProject /> };
export const Rtl: Story = { parameters: { originalExample: 'empty-rtl' }, render: () => <OfficialRtl /> };
export const Usage: Story = { render: () => <Empty><EmptyHeader><EmptyMedia variant="icon"><IconFolderCode /></EmptyMedia><EmptyTitle>No data</EmptyTitle><EmptyDescription>No data found</EmptyDescription></EmptyHeader><EmptyContent>Add data to get started.</EmptyContent></Empty> };
export const Outline: Story = { parameters: { originalExample: "empty-outline" }, render: () => <Empty {...emptyCustom('outline')}><EmptyHeader><EmptyMedia variant="icon"><IconCloud /></EmptyMedia><EmptyTitle>Cloud Storage Empty</EmptyTitle><EmptyDescription>Upload files to your cloud storage to access them anywhere.</EmptyDescription></EmptyHeader><EmptyContent><Button variant="outline" size="sm">Upload Files</Button></EmptyContent></Empty> };
export const Background: Story = { parameters: { originalExample: "empty-background" }, render: () => <Empty {...emptyCustom('background')}><EmptyHeader><EmptyMedia variant="icon"><IconBell /></EmptyMedia><EmptyTitle>No Notifications</EmptyTitle><EmptyDescription {...emptyCustom('pretty')}>You're all caught up. New notifications will appear here.</EmptyDescription></EmptyHeader><EmptyContent><Button variant="outline"><RefreshCcwIcon data-icon="inline-start" />Refresh</Button></EmptyContent></Empty> };
export const AvatarExample: Story = { parameters: { originalExample: 'empty-avatar' }, render: () => <OfficialAvatarExample /> };
export const AvatarGroup: Story = { parameters: { originalExample: "empty-avatar-group" }, render: () => <Empty><EmptyHeader><EmptyMedia><div style={{ display: 'flex' }}>{[['shadcn','CN'],['maxleiter','LR'],['evilrabbit','ER']].map(([user, fallback], i) => <Avatar key={user} {...emptyCustom('groupAvatar')} style={{ marginInlineEnd: i < 2 ? -8 : 0 }}><AvatarImage src={`https://github.com/${user}.png`} alt={`@${user}`} /><AvatarFallback>{fallback}</AvatarFallback></Avatar>)}</div></EmptyMedia><EmptyTitle>No Team Members</EmptyTitle><EmptyDescription>Invite your team to collaborate on this project.</EmptyDescription></EmptyHeader><EmptyContent><Button size="sm"><PlusIcon />Invite Members</Button></EmptyContent></Empty> };
export const InputGroupExample: Story = { tags: ['viewport-390'], parameters: { originalExample: 'empty-input-group' }, render: () => <OfficialInputGroupExample /> };
export const Structure: Story = { render: () => <><Empty><EmptyHeader><EmptyMedia variant={null}><IconBell /></EmptyMedia><EmptyTitle>Null media</EmptyTitle></EmptyHeader><EmptyContent><EmptyMedia variant="icon"><span><IconBell /></span><IconBell className="size-explicit" style={{ width: 22, height: 22 }} /></EmptyMedia><EmptyDescription><a href="#">Direct</a><span><a href="#">Nested</a></span></EmptyDescription></EmptyContent></Empty><EmptyMedia variant="icon" data-variant="default" data-slot="custom"><IconCloud /></EmptyMedia></> };
function Customized() { const [width, setWidth] = useState(320); const custom = emptyDynamic(width); return <Empty {...custom} style={{ ...custom.style, width: width + 20 }} onClick={() => setWidth(width + 40)} data-testid="custom-empty"><EmptyHeader><EmptyTitle style={{ fontWeight: 700 }}>Resize empty</EmptyTitle></EmptyHeader><EmptyContent>Click to resize</EmptyContent></Empty>; }
export const Customization: Story = { render: () => <Customized /> };
function RegistryProject({ media = false }) { return <Empty><EmptyHeader>{media && <EmptyMedia variant="icon"><FolderIcon /></EmptyMedia>}<EmptyTitle>No projects yet</EmptyTitle><EmptyDescription>You haven't created any projects yet. Get started by creating your first project.</EmptyDescription></EmptyHeader><EmptyContent><div style={{ display: 'flex', gap: 8 }}><LinkButton href="#">Create project</LinkButton><Button variant="outline">Import project</Button></div><LinkButton variant="link" href="#" {...emptyCustom('muted')}>Learn more <ArrowUpRightIcon /></LinkButton></EmptyContent></Empty>; }
export const RegistryBasic: Story = { render: () => <RegistryProject /> };
export const RegistryInCard: Story = { render: () => <RegistryProject media /> };
export const RegistryMuted: Story = { render: () => <Empty {...emptyCustom('mutedBackground')}><EmptyHeader><EmptyTitle>No results found</EmptyTitle><EmptyDescription>No results found for your search. Try adjusting your search terms.</EmptyDescription></EmptyHeader><EmptyContent><Button>Try again</Button><LinkButton variant="link" href="#" {...emptyCustom('muted')}>Learn more <ArrowUpRightIcon /></LinkButton></EmptyContent></Empty> };
function RegistrySearch({ muted = false }) { return <Empty {...emptyCustom(muted ? 'mutedAlt' : 'outline')}><EmptyHeader><EmptyTitle>404 - Not Found</EmptyTitle><EmptyDescription>The page you're looking for doesn't exist. Try searching for what you need below.</EmptyDescription></EmptyHeader><EmptyContent><InputGroup {...emptyCustom('inputAlways')}><InputGroupInput placeholder="Try searching for pages..." /><InputGroupAddon><CircleDashedIcon /></InputGroupAddon><InputGroupAddon align="inline-end"><Kbd>/</Kbd></InputGroupAddon></InputGroup><EmptyDescription>Need help? <a href="#">Contact support</a></EmptyDescription></EmptyContent></Empty>; }
export const RegistryBorder: Story = { render: () => <RegistrySearch /> };
export const RegistryMutedAlt: Story = { render: () => <RegistrySearch muted /> };
export const RegistryIcon: Story = { render: () => <Empty {...emptyCustom('outline')}><EmptyHeader><EmptyMedia variant="icon"><FolderIcon /></EmptyMedia><EmptyTitle>Nothing to see here</EmptyTitle><EmptyDescription>No posts have been created yet. Get started by <a href="#">creating your first post</a>.</EmptyDescription></EmptyHeader><EmptyContent><Button variant="outline"><PlusIcon data-icon="inline-start" />New Post</Button></EmptyContent></Empty> };
