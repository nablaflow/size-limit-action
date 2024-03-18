import { exec } from "@actions/exec";

import process from 'node:process';
import path from 'node:path';
import fs from 'node:fs';

class Term {
  async execSizeLimit(
    branch?: string,
    buildScript?: string,
    script?: string,
    directory?: string,
  ): Promise<{ status: number; output: string }> {
    let output = "";

    if (branch) {
      try {
        await exec(`git fetch origin ${branch} --depth=1`);
      } catch (error) {
        console.log("Fetch failed", error.message);
      }

      await exec(`git checkout -f ${branch}`);
    }

    if (buildScript) {
      await exec(buildScript);
    }

    const status = await exec(script, [], {
      ignoreReturnCode: true,
      listeners: {
        stdout: (data: Buffer) => {
          output += data.toString();
        }
      },
      cwd: directory
    });

    return {
      status,
      output
    };
  }
}

export default Term;
