#!/usr/bin/env node
import yargs from "yargs";
import { table } from "table";
import { Spinner } from 'cli-spinner';
import { visible } from "@vsbl/core";

yargs.command(
  "*",
  "the default command",
  yargs =>
    yargs.option("url", {
      description: "URL to diagnosis",
      type: "string",
      required: true
    }),

  async ({ url }) => {
    const spinner = new Spinner('Fetching diagnosis...');
    spinner.setSpinnerString(0);
    spinner.start();

    const reports = await visible({ url });

    const rows = reports.map(report => [report.type, report.id, report.html]);
    const output = table(rows, {
      columns: {
        0: { alignment: "left" },
        1: { alignment: "left" },
        2: { alignment: "left", truncate: 100 }
      },
      singleLine: true
    });

    spinner.stop();
    console.log('\n' + output);
  }
).argv;
