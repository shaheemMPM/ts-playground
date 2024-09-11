import { Liquid } from "liquidjs";
// import { Barcode } from "../plugins/barcode";
// import { Money } from "../plugins/money";
// import { MoneyFormat } from "../plugins/money-format";
// import { QRCode } from "../plugins/qrcode";

const engine: Liquid = new Liquid();

// Barcode(engine);
// Money(engine);
// MoneyFormat(engine);
// QRCode(engine);

/**
 * Renders a Liquid template with the provided data.
 *
 * @param {string} template - The Liquid template string to render.
 * @param {Record<string, unknown>} data - The data object to use for rendering the template.
 * @returns {Promise<string>} A promise that resolves to the rendered HTML string.
 * @throws {Error} If there's an error during template rendering.
 */
export const renderLiquid = async (
  template: string,
  data: Record<string, unknown>
): Promise<string> => {
  try {
    const renderedHtml: string = await engine.parseAndRender(template, data);
    return renderedHtml;
  } catch (error) {
    console.error("Error rendering Liquid template:", error);
    throw new Error(`Failed to render template: ${(error as Error).message}`);
  }
};
