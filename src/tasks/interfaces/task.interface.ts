export interface ITask {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly priority: number;
  readonly status: boolean;
  readonly viewsCount: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
