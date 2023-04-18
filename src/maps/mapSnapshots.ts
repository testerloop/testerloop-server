import { z } from 'zod';


const SnapshotSchema = z.object({
    snapshotID: z.number(),
    name: z.string(),
    beforeBody: z.string(),
    afterBody: z.string()
})

const SnapshotsSchema = z.array(SnapshotSchema)

export type SnapshotType = z.infer<typeof SnapshotSchema>;

const mapSnapshots = (rawSnapshots: unknown, testExecutionId: string) => {
    const snapshots = SnapshotsSchema.parse(rawSnapshots);

    return Object.fromEntries(
        snapshots.map((obj) => {
            const id = `${testExecutionId}/snapshot/${obj.snapshotID}`;
            return [
                id,
                {...obj, _id: id}
            ]
        })
        );
}

export default mapSnapshots;
