import { useState } from "react";
import { CreatedTeam } from "../lib/types/team";
import { useStore, initialTeamForm } from "./StoreContext";
import Player from "../lib/types/player";

export enum ModalType
{
    create = "create-team-modal",
    remove = "remove-team-modal",
    update = "update-team-modal",
    join = "join-team-modal",
    leave = "leave-team-modal"
}

export function JoinButton({ player, }: { player: Player; })
{
    const { setSelectedPlayer, teams } = useStore();
    function onClick()
    {
        setSelectedPlayer(player.id);

        // @ts-ignore
        document.getElementById(ModalType.join).showModal();

    }
    return <button className="btn btn-sm btn-primary" onClick={onClick}>{teams.findIndex((v: any) => v.players.includes(player.id)) === -1 ? "Join A Team" : "Move Team"}</button>;
}

export function LeaveButton({ player, }: { player: Player; })
{
    const { setSelectedPlayer, teams } = useStore();
    function onClick()
    {
        setSelectedPlayer(player.id);

        // @ts-ignore
        document.getElementById(ModalType.leave).showModal();
    }
    return <button className="btn btn-sm btn-error" onClick={onClick}>Leave Team</button>;
}


export function CreateButton()
{
    const { setTeamForm, teamCount, setErrorMessage } = useStore();
    function onClick()
    {
        setErrorMessage({
            name: "",
            region: "",
            country: ""
        });
        setTeamForm({ ...initialTeamForm, id: new Date().getTime() } as CreatedTeam);
        // @ts-ignore
        document.getElementById(ModalType.create).showModal();

    }
    return <button className="btn btn-sm btn-primary" onClick={onClick}>Create</button>;
}

export function UpdateButton({ team }: { team: CreatedTeam; })
{
    const { setTeamForm, setErrorMessage } = useStore();
    function onClick()
    {
        setErrorMessage({
            name: "",
            region: "",
            country: ""
        });
        setTeamForm(team);
        // @ts-ignore
        document.getElementById(ModalType.update).showModal();

    }
    return <button className="btn btn-sm btn-neutral" onClick={onClick}>Update</button>;
}
export function DeleteButton({ team }: { team: CreatedTeam; })
{
    const { setTeamForm } = useStore();
    function onClick()
    {
        setTeamForm(team);
        // @ts-ignore
        document.getElementById(ModalType.remove).showModal();

    }
    return <button className="btn btn-sm btn-error" onClick={onClick}>Delete</button>;
}


function ModalWrapper({ children, modalName }: { children: React.ReactNode; modalName: string; })
{
    return <>
        <dialog id={modalName} className="modal">
            <div className="modal-box">
                {children}
            </div>
        </dialog></>;
}

function EditForm({ onSubmit }: { onSubmit: () => void; })
{
    const { teamForm, setTeamForm, errorMessage } = useStore();

    return <>
        <form onSubmit={(e) =>
        {
            e.preventDefault();
            onSubmit();
        }}>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Name</span>
                </label>
                <input type="name"
                    placeholder="name"
                    className={errorMessage.name ? "input input-bordered input-error" : "input input-bordered"}
                    required
                    value={teamForm!.name}
                    onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value } as CreatedTeam)}
                />
            </div>

            <p className="text-error">{errorMessage.name}</p>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Region</span>
                </label>
                <input type="region"
                    placeholder="region"
                    className={errorMessage.region ? "input input-bordered input-error" : "input input-bordered"}
                    required
                    value={teamForm!.region}
                    onChange={(e) => setTeamForm({ ...teamForm, region: e.target.value } as CreatedTeam)}
                />
            </div>

            <p className="text-error">{errorMessage.region}</p>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Country</span>
                </label>
                <input type="country"
                    placeholder="country"
                    className={errorMessage.country ? "input input-bordered input-error" : "input input-bordered"}
                    required
                    value={teamForm!.country}
                    onChange={(e) => setTeamForm({ ...teamForm, country: e.target.value } as CreatedTeam)}
                />
            </div>
            <p className="text-error">{errorMessage.country}</p>
            <button hidden type="submit"></button>
        </form>

        <div className="modal-action">
            <button className="btn" onClick={onSubmit}>Submit</button>
            <form method="dialog">
                <button className="btn">Close</button>
            </form>
        </div>
    </>;

};

export function CreateModal()
{

    const { addTeam } = useStore();
    function onSubmit()
    {
        const success = addTeam();
        if (success)
        {
            // @ts-ignore
            document.getElementById(ModalType.create).close();
        }
    }
    return <ModalWrapper modalName={ModalType.create}>
        <EditForm onSubmit={onSubmit} />
    </ModalWrapper>;
}

export function UpdateModal()
{
    const { updateTeam } = useStore();
    const [errorMessage, setErrorMessage] = useState("");
    function onSubmit()
    {
        setErrorMessage("");
        const success = updateTeam();
        if (success)
        {
            // @ts-ignore
            document.getElementById(ModalType.update).close();
        }
    }
    return <ModalWrapper modalName={ModalType.update}>
        <EditForm onSubmit={onSubmit} />
    </ModalWrapper>;
}

export function DeleteModal()
{
    const { removeTeam, teamForm } = useStore();
    function onSubmit()
    {
        removeTeam();
        // @ts-ignore
        document.getElementById(ModalType.remove).close();

    }
    return <ModalWrapper modalName={ModalType.remove}>
        <h3 className="font-bold text-lg text-error">Confirm Team Deletion</h3>
        <p>Are you sure you want to delete <span className="font-semibold">{teamForm?.name}?</span></p>
        <div className="modal-action">
            <button className="btn btn-error" onClick={onSubmit}>Delete</button>
            <form method="dialog">
                <button className="btn">Close</button>
            </form>
        </div>
    </ModalWrapper>;
}

export function JoinTeamModal()
{
    const { teams, joinTeam } = useStore();
    const [selectedTeam, setSelectedTeam] = useState<number>();
    function onSubmit()
    {
        joinTeam(selectedTeam!);
        // @ts-ignore
        document.getElementById(ModalType.join).close();

    }
    return <ModalWrapper modalName={ModalType.join}>
        {teams.length > 0 ? <>
            <h3 className="font-bold text-lg text-primary">Join A Team</h3>
            <select className="select select-bordered w-full max-w-xs" onChange={(e) =>
            {
                setSelectedTeam(parseInt(e.target.value));
            }}
                defaultValue={"Select A Team"}>
                <option disabled>Select A Team</option>
                {teams.map((t: CreatedTeam) => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
            {/* {selectedTeam && <p>Want to join {teams[teams.indexOf((v: any) => v.id === selectedTeam)].name}?</p>} */}
            <div className="modal-action">
                {selectedTeam && <button className="btn" onClick={onSubmit}>Join</button>}

                <form method="dialog">
                    <button className="btn">Close</button>
                </form>
            </div></> : <>
            <p>Create a team first</p>
        </>
        }
    </ModalWrapper >;
}

export function LeaveTeamModal()
{
    const { teams, leaveTeam } = useStore();

    function onSubmit()
    {
        leaveTeam();
        // @ts-ignore
        document.getElementById(ModalType.leave).close();

    }
    return <ModalWrapper modalName={ModalType.leave}>
        {teams.length > 0 ? <>
            <h3 className="font-bold text-lg text-error">Leave team?</h3>
            <div className="modal-action">
                <button className="btn btn-error" onClick={onSubmit}>Leave</button>
                <form method="dialog">
                    <button className="btn">Close</button>
                </form>
            </div></> : <>
            <p>Create a team first</p>
        </>
        }
    </ModalWrapper >;
}