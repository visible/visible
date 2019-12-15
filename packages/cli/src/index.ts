#!/usr/bin/env node
import yargs from "yargs";
import { table, getBorderCharacters } from "table";
import { Spinner } from "cli-spinner";
import chalk from "chalk";
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
    const spinner = new Spinner("Fetching diagnosis...");
    spinner.setSpinnerString(18);
    spinner.start();

    const reports = await visible({ url });

    const rows = [[chalk.bold("Kind"), chalk.bold("Type"), chalk.bold("HTML")]];

    const body = reports.map(report => {
      const type = {
        ok: chalk.green("ok"),
        info: chalk.yellow("info"),
        warn: chalk.magenta("warn"),
        error: chalk.red("error")
      }[report.type];

      return [type, report.id, report.html ? report.html : ""];
    });

    rows.push(...body);

    const output = table(rows);

    spinner.stop();
    console.log("\n" + output);
  }
).argv;
