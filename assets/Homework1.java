import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.nio.charset.StandardCharsets;

public class Homework1 {
 	public static String getSHA(String input) throws NoSuchAlgorithmException
 	{
 		MessageDigest md = MessageDigest.getInstance("SHA-256");
 		
 		byte byteData[] = md.digest(input.getBytes(StandardCharsets.UTF_8));

 		StringBuffer hash = new StringBuffer();

 		for (byte b : byteData)
		{
			hash.append(String.format("%02x", b));
		}
		return hash.toString();
	}



    public static void main(String args[]) 
    {
        try
        {
    		String s1 = "blockchain homework1";

    		System.out.println(getSHA(s1));

       	}
    	catch (NoSuchAlgorithmException e) 
    	{
    		System.out.println("Exception: " + e);
    	}
    }
}
