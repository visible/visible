export const mockAudit = jest.fn(() => []);

export const fetchPlugin = (_name: string) => ({
  rules: [
    class {
      audit = mockAudit;
    },
  ],
});
