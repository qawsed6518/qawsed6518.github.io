import java.security.NoSuchAlgorithmException;
import java.math.BigInteger;
import java.security.MessageDigest;

final class Block {
	private final int difficulty;
	private final long nonce;
	private final String sha;
	private final long executionTime;

	public Block(int d, long n, String s, long t){
		this.difficulty = d;
		this.nonce = n;
		this.sha = s;
		this.executionTime = t;
	}
	public void printBlock(){
		System.out.println("Difficulty: " + difficulty);
		System.out.println("Nonce: " + nonce);
		System.out.println("SHA-256: " + sha);
		System.out.println("execution time: " + executionTime);
	}
}


public class Homework3 {


	public static byte[] getSHA(byte[] input) throws NoSuchAlgorithmException
 	{
 		MessageDigest md = MessageDigest.getInstance("SHA-256");		
 		return md.digest(input);
	}

	public static String toHex(byte[] byteData) 
	{
		StringBuffer hash = new StringBuffer();
 		for (byte b : byteData)
		{
			hash.append(String.format("%02x", b));
		}
		return hash.toString();
	}

	public static String Hash(String bc, long nonce)
	{
		String bcn = bc + nonce;
		byte[] block = bcn.getBytes();
		String Hex = "";
		try 
		{
			block = getSHA(block);
			Hex = toHex(getSHA(block));
		}
		catch (NoSuchAlgorithmException e) 
		{
			System.out.println("Exception: " + e);
		}


		return Hex;
	}

	public static Block FindNonce(String bc, int diff)
	{
		long nonce = 1;
		long startTime = System.currentTimeMillis();
		BigInteger difficulty = BigInteger.ONE.shiftLeft(256-diff).add(BigInteger.valueOf(-1));

		while(true)
			{
			BigInteger SHA = new BigInteger(Hash(bc, nonce), 16);
			if(SHA.compareTo(difficulty) == -1)
			{
				long executionTime = System.currentTimeMillis() - startTime;
				return new Block(diff,nonce,String.format("%256s", SHA.toString(2)).replace(' ', '0'), executionTime);
			}
			else nonce++;
		}
	}

	public static void main(String args[]) 
	{
		String bc = "blockchain";

		for(int i = 1; i <=20; i++){
			Block temp = FindNonce(bc,i);
			temp.printBlock();
			System.out.println("");
		}
	}
}