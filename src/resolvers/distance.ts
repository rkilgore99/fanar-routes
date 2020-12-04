import { QueryResolvers } from "../schemas/gen-types";
import { QueryqueryDistanceIfIDNullArgs, QuerycheckDistanceBetweenPortsAPIArgs, QueryhandleMissingDistanceArgs, QueryremoveRedundantDistanceInfoArgs, DistanceBetweenPorts, Distance, Port} from "../schemas/gen-types"
import { config } from "dotenv"
import { environment } from "../environment";
import { request, gql } from 'graphql-request';
import Maybe from "graphql/tsutils/Maybe";

const fetch = require("node-fetch")
/**
 * graphql-code-gen generates resolvers for each Type in the GraphQL schema.
 * Here we aggregate the interfaces for Info resolved within this file, along
 * with the common Query Type.
 *
 * When an interface is added here, it also needs to be added in the top-level
 * file, resolvers.ts.
 */
interface Resolvers {
  Query: QueryResolvers;
}

async function getPortsByName(names: string[]) : Promise<Port[]> {
    let K = process.env.DISTANCE_API_KEY
    let myUrl = `https://api.atobviaconline.com/v1/Ports?port=Jeddah&port=Yanbu&api_key=${K}`
    const response = await fetch(myUrl, {
        method: 'GET',
        //body: content,
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'} });
    if (!response.ok) {
        throw new Error("The ports failed to return from the API.")
    }
    const portsResp : any[] = await response.json()
    console.log(JSON.stringify(portsResp))
    const ports : Port[] = portsResp.map(port => {
        let p = {
            id: port.Code,
            code: port.Code,
            countryCode: port.CountryCode,
            name: port.Name,
            latGeodetic: port.LatGeodetic,
            lon: port.Lon,
            locode: port.Locode
        }
        console.log(p)
        return p
    })
    return ports
}

async function handleLinearDistance(port1: string, port2: string, antiPiracy: boolean, eca: boolean) : Promise<Distance> {
    return {
        id: `${port1}-${port2}-${antiPiracy}-${eca}`,
        value: await handleLinearDistanceNum(port1, port2),
        unit: "nm"
    }
}

async function handleLinearDistanceNum(port1: string, port2: string) : Promise<number> {
    // Get the ports
    const ports = await getPortsByName([port1, port2])
    const p1lat = ports[0].latGeodetic
    const p1lon = ports[0].lon
    const p2lat = ports[1].latGeodetic
    const p2lon = ports[1].lon

    // Use logic below
    const AVERAGE_RADIUS_OF_EARTH_NM = 3440
    const latDistance = p1lat - p2lat // to radians
    const lonDistance = p1lon - p2lon // to radians
    const sinLat = Math.sin(latDistance / 2)
    const sinLng = Math.sin(lonDistance / 2)
    const a = sinLat * sinLat + (Math.cos(p1lat * p2lat * sinLng * sinLng))
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return AVERAGE_RADIUS_OF_EARTH_NM * c

    /*def GCDistanceNM(from: (Double, Double), to: (Double, Double)) : Double = {
        val AVERAGE_RADIUS_OF_EARTH_NM = 3440
        val latDistance = Math.toRadians(from._1 - to._1)
        val lngDistance = Math.toRadians(from._2 - to._2)
        val sinLat = Math.sin(latDistance / 2)
        val sinLng = Math.sin(lngDistance / 2)
        val a = sinLat * sinLat + (Math.cos(Math.toRadians(from._1)) * Math.cos(Math.toRadians(to._1))  * sinLng * sinLng)
        val c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        AVERAGE_RADIUS_OF_EARTH_NM * c
      }*/
}

async function queryDistance (
    //input: QueryqueryDistanceIfIDNullArgs,
    originName: Maybe<string>,
    destinationName: Maybe<string>,
    antiPiracy: Maybe<boolean>,
    eca: Maybe<boolean>,
    timeout = 3
): Promise<any> {
    let K = process.env.DISTANCE_API_KEY

    let myUrlClosed = `https://api.atobviaconline.com/v1/Distance?port=${originName}&port=${destinationName}&antipiracy=${antiPiracy}&envnavreg=${eca}&close=${"SUZ"}&api_key=${K}`
    let myUrl = `https://api.atobviaconline.com/v1/Distance?port=${originName}&port=${destinationName}&antipiracy=${antiPiracy}&envnavreg=${eca}&api_key=${K}`

    const responseClosed = await fetch(myUrlClosed, {
        method: 'GET',
        //body: content,
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'} });
    const response = await fetch(myUrl, {
        method: 'GET',
        //body: content,
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'} });

    if (!response.ok && !responseClosed.ok) {
        if (timeout > 0) {
            return queryDistance(originName, destinationName, antiPiracy, eca, timeout - 1)
        }
        throw new Error("Failure to query a distance, tried 3 times (default).")
    }

    let closedDistance = await responseClosed.json()
    const distance = await response.json()
    if (!responseClosed.ok) {
        console.log(`An issue has occurred, the closedDistance is not present in the API, using the default distance in place of closed distance.`)
        closedDistance = distance
    }

    return {
        id: `${originName}-${destinationName}-${antiPiracy}-${eca}`,
        originName: originName,
        destinationName: destinationName,
        antiPiracy: antiPiracy,
        eca: eca,
        distance: {
            id: `${originName}-${destinationName}-${antiPiracy}-${eca}`,
            value: distance,
            unit: "nm"
        },
        suezClosedDistance: closedDistance,
        suezRoute: distance == closedDistance,
        fromAPI: true,
        verified: false
    }
}

export const DistanceResolver: Resolvers = {
  Query: {
    distanceInfo: () => {
        throw new Error(
            "The user is stupid"
        )
    },
    checkDistanceBetweenPortsAPI: (
        input: QuerycheckDistanceBetweenPortsAPIArgs
    ) => {
        throw new Error(
            "This function is not yet implemented."
        )
        return true
    },
    queryDistanceIfIDNull: async (root, {id, originName, destinationName, antiPiracy, eca}
        /*id: Maybe<ID>,
        originName: Maybe<string>,
        destinationName: Maybe<string>,
        antiPiracy: Maybe<boolean>,
        eca: Maybe<boolean>,*/
        //input: QueryqueryDistanceIfIDNullArgs
    ) => {
        //console.log(JSON.stringify(input))
        if (id) {
            return null
        }
        return await queryDistance(originName, destinationName, antiPiracy, eca)
    },
    handleMissingDistance: async (
        input: QueryhandleMissingDistanceArgs
    ) => {
        // This handles the linear distance.
        const dist : DistanceBetweenPorts = {
            id: "",
            port1: input.distance!.port1,
            port2: input.distance!.port2,
            antiPiracy: input.distance!.antiPiracy,
            eca: input.distance!.eca,
            distance: input.distance?.distance ? input.distance.distance : await handleLinearDistance(input.distance!.port1, input.distance!.port2, input.distance!.antiPiracy, input.distance!.eca),
            suezClosedDistance: input.distance?.suezClosedDistance ? input.distance.suezClosedDistance : await handleLinearDistanceNum(input.distance!.port1, input.distance!.port2),
            suezRoute: input.distance!.suezRoute!,
            fromAPI: true,
            verified: false
        }
        return dist
        /*return new DistanceBetweenPorts(
            id: "",
            port1: input.distance!.port1,
            port2: input.distance!.port2,
            antiPiracy: input.distance!.antiPiracy,
            eca: input.distance!.eca,
            distance: input.distance!.distance,
            suezClosedDistance: input.distance!.suezClosedDistance,
            suezRoute: input.distance!.suezRoute,
            fromAPI: true,
            verified: false
        )*/
    },
    removeRedundantDistanceInfo: (
        input: QueryremoveRedundantDistanceInfoArgs
    ) => {
        return input.distance!.distance!
    },
    allPortsFromAPI: async ()=>{
        let K = process.env.DISTANCE_API_KEY
        let myUrl = `https://api.atobviaconline.com/v1/Ports?api_key=${K}`
        const response = await fetch(myUrl, {
            method: 'GET',
            //body: content,
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'} });
        if (!response.ok) {
            throw new Error("The ports failed to return from the API.")
        }
        const portsResp : any[] = await response.json()
        console.log(JSON.stringify(portsResp))
        const ports : Port[] = portsResp.map(port => {
            let p = {
                id: port.Code,
                code: port.Code,
                countryCode: port.CountryCode,
                name: port.Name,
                latGeodetic: port.LatGeodetic,
                lon: port.Lon,
                locode: port.Locode
            }
            console.log(p)
            return p
        })
        return ports
        /**def get_ports(api_key: Text = "demo"):
    """
    Note that these ports are not the same as the ports in aramco_fanar/logic.
    This function returns the ports from atobviac. This implied that unique identifiers may not match, and the data
    type provided py the functions are inherently different.
    :param api_key:
    :return: [port]
    """
    query = string.Template(
        """https://api.atobviaconline.com/v1/Ports?api_key=$K"""
    )
    final_query = query.safe_substitute(
        K=api_key
    )

    out = requests.get(final_query)
    if out.status_code == 200:
        output = out.json()  # returns List[Dict]
        return [convert_port_naming(i) for i in output]
    else:
        logger.error("Query failed! Code: {}\nText: {}".format(
            out.status_code, out.text))
        return None */
    }
  }
};