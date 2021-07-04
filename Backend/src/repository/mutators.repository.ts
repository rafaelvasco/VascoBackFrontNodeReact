import { ValueMutator, mutators } from "model/valueMutators";
import { Mutator } from "dto/Mutator";
import { mutatorsDb } from "./db";

export class MutatorsRepository {
    public getAvailable(): Array<Mutator> {
        return Object.keys(mutators).map((mutatorId) => {
            return {
                id: mutatorId,
                name: this.get(mutatorId).name,
                active:
                    mutatorsDb.active.findIndex((m) => m === mutatorId) >= 0,
            } as Mutator;
        });
    }

    public updateMutator(mutator: Mutator) {
        if (!this.get(mutator.id)) {
            throw `Could not find mutator with id: ${mutator.id}`;
        }

        if (mutator.active && mutatorsDb.active.indexOf(mutator.id) === -1) {
            console.log(`Adding mutator: ${mutator.id}`);
            mutatorsDb.active.push(mutator.id);
        } else {
            console.log(`Removing mutator: ${mutator.id}`);
            mutatorsDb.active.splice(mutatorsDb.active.indexOf(mutator.id), 1);
        }
    }

    // Internal

    public getActive(): Array<ValueMutator> {
        return mutatorsDb.active.map((mutatorId) => this.get(mutatorId));
    }

    public get(mutatorId: string): ValueMutator {
        return mutators[mutatorId];
    }
}
