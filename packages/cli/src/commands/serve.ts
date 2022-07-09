import { Command } from "commander";
import { serve } from "local-api";
import path from "path";



const isProduction = process.env.NODE_ENV === "production"
export const serveCommand = new Command()
    .command("serve [filename]")
    .description("Open a file for editing")
    .option("-p, --port <number>", "port to run server on", "4005")
    .action((filename = "notebook.js", opts: { port: string }) => {
        try {
            const dir = path.join(process.cwd(), path.dirname(filename));
            serve(parseInt(opts.port), path.basename(filename), dir, !isProduction);
            console.log(`
                Opened ${filename}. Navigate to http://localhost:${opts.port} to edit the notebook.
            `)
        } catch (err: any) {
            if(err.code === "EADDRINUSE"){
                console.error("Port is in use")
            } else {
                console.log(err.message);
            }
            process.exit(1)
        }
    });
