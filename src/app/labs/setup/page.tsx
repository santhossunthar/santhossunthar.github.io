import type { Metadata } from 'next';
import Breadcrumb from '@/components/blog/Breadcrumb';
import LabMobileMenu from '@/components/labs/LabMobileMenu';
import LabRightSidebar from '@/components/labs/LabRightSidebar';
import LabSidebar from '@/components/labs/LabSidebar';
import { getAllLabs } from '@/lib/lab/lab-utils';
import { TableOfContentsItem } from '@/lib/shared/table-of-contents';

const tableOfContents: TableOfContentsItem[] = [
  { id: 'install-the-lab-manager', text: 'Install The Lab Manager', level: 2 },
  { id: 'local-workspace', text: 'Local Workspace', level: 2 },
  { id: 'lab-config', text: 'Lab Config', level: 2 },
  { id: 'commands', text: 'Commands', level: 2 },
  { id: 'how-pull-works', text: 'How Pull Works', level: 2 },
  { id: 'publishing-checklist', text: 'Publishing Checklist', level: 2 },
];

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Lab Manager Setup - CTF Labs',
    description: 'Install and use the local CTF Labs manager',
    alternates: {
      canonical: '/labs/setup/',
    },
  };
}

export default function LabManagerSetupPage() {
  const labs = getAllLabs();

  return (
    <div className="blog-page min-h-screen bg-black">
      <LabMobileMenu title="Lab Manager" currentView="setup" />

      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
          <div className="hidden lg:flex lg:col-span-2 flex-col sticky top-0 h-screen border-r border-white/20">
            <LabSidebar currentView="setup" />
          </div>

          <main className="lg:col-span-7 px-4 border-r border-white/20">
            <div className="hidden lg:block sticky top-0 z-10 bg-black/95 backdrop-blur-sm border-b border-white/30 py-3 px-2 mb-6">
              <Breadcrumb items={[{ label: 'Labs', path: '/labs/' }, { label: 'Lab Manager' }]} />
            </div>

            <div className="lg:hidden pt-16"></div>

            <article className="bg-black border border-white/20 rounded-lg p-4 md:p-6 font-cyber">
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="px-2 py-1 bg-white/20 text-white text-xs rounded-full border border-white/30">Setup</span>
                  <span className="px-2 py-1 bg-white/10 text-white text-xs rounded-full">Bash + PowerShell</span>
                </div>
                <h1 className="text-3xl font-bold text-white mb-4">Lab Manager Setup</h1>
                <p className="text-white/80 text-sm leading-relaxed">
                  Install the local `ctf-labs` script package once, then pull, start, stop, and update CTF labs from any terminal.
                </p>
              </div>

              <div className="prose prose-invert max-w-none">
                <h2 id="install-the-lab-manager" className="scroll-mt-24 text-2xl font-bold text-white mb-4 mt-6">Install The Lab Manager</h2>
                <p className="text-white/90 text-[0.95rem] mb-4 leading-relaxed">Linux and macOS users can install the script package with:</p>
                <pre className="bg-white/10 border border-white/20 p-4 rounded-lg overflow-x-auto mb-4"><code className="text-white text-sm font-mono block">curl -fsSL https://raw.githubusercontent.com/santhossunthar/santhossunthar.github.io/main/install.sh | bash</code></pre>
                <p className="text-white/90 text-[0.95rem] mb-4 leading-relaxed">Windows PowerShell users can install it with:</p>
                <pre className="bg-white/10 border border-white/20 p-4 rounded-lg overflow-x-auto mb-4"><code className="text-white text-sm font-mono block">iwr https://raw.githubusercontent.com/santhossunthar/santhossunthar.github.io/main/install.ps1 -UseB | iex</code></pre>

                <h2 id="local-workspace" className="scroll-mt-24 text-2xl font-bold text-white mb-4 mt-6">Local Workspace</h2>
                <p className="text-white/90 text-[0.95rem] mb-4 leading-relaxed">The installer downloads the scripts locally so users do not need to pipe remote commands every time they manage a lab.</p>
                <pre className="bg-white/10 border border-white/20 p-4 rounded-lg overflow-x-auto mb-4"><code className="text-white text-sm font-mono block">{`~/.ctf-labs/
  bin/
    ctf-labs
    ctf-labs.ps1
  cache/
  labs/
  state.json`}</code></pre>
                <p className="text-white/90 text-[0.95rem] mb-4 leading-relaxed">Recommended Bash alias:</p>
                <pre className="bg-white/10 border border-white/20 p-4 rounded-lg overflow-x-auto mb-4"><code className="text-white text-sm font-mono block">alias ctf-labs="$HOME/.ctf-labs/bin/ctf-labs"</code></pre>
                <p className="text-white/90 text-[0.95rem] mb-4 leading-relaxed">Recommended PowerShell function:</p>
                <pre className="bg-white/10 border border-white/20 p-4 rounded-lg overflow-x-auto mb-4"><code className="text-white text-sm font-mono block">{`function ctf-labs {
  & "$HOME\\.ctf-labs\\bin\\ctf-labs.ps1" @args
}`}</code></pre>

                <h2 id="lab-config" className="scroll-mt-24 text-2xl font-bold text-white mb-4 mt-6">Lab Config</h2>
                <p className="text-white/90 text-[0.95rem] mb-4 leading-relaxed">Use one GitHub repository as the source of truth for every lab.</p>
                <pre className="bg-white/10 border border-white/20 p-4 rounded-lg overflow-x-auto mb-4"><code className="text-white text-sm font-mono block">{`santhossunthar.github.io/
  install.sh
  install.ps1
  scripts/
    ctf-labs.sh
    ctf-labs.ps1
  labs.json
  returndesk/
    lab.json
    Vagrantfile
    artifacts/
    readme.md`}</code></pre>
                <p className="text-white/90 text-[0.95rem] mb-4 leading-relaxed">The root `labs.json` advertises all available labs. Each lab can also include `lab.json` for provider commands and resource hints.</p>
                <pre className="bg-white/10 border border-white/20 p-4 rounded-lg overflow-x-auto mb-4"><code className="text-white text-sm font-mono block">{`{
  "name": "ReturnDesk",
  "slug": "returndesk",
  "version": "1.0.0",
  "provider": "vagrant",
  "entrypoint": "Vagrantfile",
  "commands": {
    "up": "vagrant up",
    "stop": "vagrant halt",
    "destroy": "vagrant destroy -f",
    "status": "vagrant status"
  }
}`}</code></pre>

                <h2 id="commands" className="scroll-mt-24 text-2xl font-bold text-white mb-4 mt-6">Commands</h2>
                <div className="overflow-x-auto mb-4">
                  <table className="min-w-full border border-white/20 rounded-lg">
                    <thead>
                      <tr>
                        <th className="border border-white/20 px-4 py-2 bg-white/10 text-white font-bold">Command</th>
                        <th className="border border-white/20 px-4 py-2 bg-white/10 text-white font-bold">Behavior</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="border border-white/20 px-4 py-2 text-white/90">ctf-labs list</td><td className="border border-white/20 px-4 py-2 text-white/90">Shows available labs</td></tr>
                      <tr><td className="border border-white/20 px-4 py-2 text-white/90">ctf-labs pull returndesk</td><td className="border border-white/20 px-4 py-2 text-white/90">Downloads or updates one lab</td></tr>
                      <tr><td className="border border-white/20 px-4 py-2 text-white/90">ctf-labs pull all</td><td className="border border-white/20 px-4 py-2 text-white/90">Downloads or updates all labs</td></tr>
                      <tr><td className="border border-white/20 px-4 py-2 text-white/90">ctf-labs up returndesk</td><td className="border border-white/20 px-4 py-2 text-white/90">Starts a lab</td></tr>
                      <tr><td className="border border-white/20 px-4 py-2 text-white/90">ctf-labs update</td><td className="border border-white/20 px-4 py-2 text-white/90">Updates the local script package</td></tr>
                    </tbody>
                  </table>
                </div>

                <h2 id="how-pull-works" className="scroll-mt-24 text-2xl font-bold text-white mb-4 mt-6">How Pull Works</h2>
                <ol className="text-white/90 text-[0.95rem] mb-4 ml-6 list-decimal">
                  <li className="mb-2 text-[0.95rem]">Download remote `labs.json`.</li>
                  <li className="mb-2 text-[0.95rem]">Find the requested lab by slug or name.</li>
                  <li className="mb-2 text-[0.95rem]">Read local `~/.ctf-labs/state.json`.</li>
                  <li className="mb-2 text-[0.95rem]">Skip the lab when the same version and commit already exist.</li>
                  <li className="mb-2 text-[0.95rem]">Download missing or outdated labs into a temporary cache.</li>
                  <li className="mb-2 text-[0.95rem]">Validate the entrypoint, move the lab into the workspace, and update state.</li>
                </ol>

                <h2 id="publishing-checklist" className="scroll-mt-24 text-2xl font-bold text-white mb-4 mt-6">Publishing Checklist</h2>
                <ol className="text-white/90 text-[0.95rem] mb-4 ml-6 list-decimal">
                  <li className="mb-2 text-[0.95rem]">Add the lab folder under `labs/&lt;slug&gt;`.</li>
                  <li className="mb-2 text-[0.95rem]">Add `lab.json` with name, slug, version, provider, and entrypoint.</li>
                  <li className="mb-2 text-[0.95rem]">Register the lab in root `labs.json`.</li>
                  <li className="mb-2 text-[0.95rem]">Test provider commands from a clean directory.</li>
                  <li className="mb-2 text-[0.95rem]">Update the website with the lab summary and setup notes.</li>
                </ol>
              </div>
            </article>
          </main>

          <div className="hidden lg:flex lg:col-span-3 flex-col">
            <LabRightSidebar labs={labs} tableOfContents={tableOfContents} />
          </div>
        </div>
      </div>
    </div>
  );
}
